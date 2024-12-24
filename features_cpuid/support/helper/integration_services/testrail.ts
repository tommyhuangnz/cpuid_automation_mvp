import * as dotenv from 'dotenv'
import TestRail from '../../extlib/testrailAPI.js'
import {
  PromiseResult,
  TestCaseResult,
  TestCaseResultPayload,
  TestRunCreatePayload,
  TestRunResult,
} from '../../interfaces'
import { intersection, union } from '../common_utils/set'
dotenv.config({ path: '.env' })
export enum TEST_MACHINE {
  // enum start from 1 because of testrail custom filed
  'N7-Z370' = 1,
  'N7-Z390',
  'N7-Z490',
  'N7-Z590',
  'N5-Z690',
  'N7-Z690',
  'N7-Z790',
  'N7-B550',
  'N7-B550-2',
  'N7-B650E',
}

class TestRailClient {
  private _testrail: TestRail

  private readonly PASSED: number = 1
  // private readonly BLOCKED: number = 2
  // private readonly UNTESTED: number = 3
  // private readonly RETEST: number = 4
  private readonly FAILED: number = 5

  private readonly CAM_PROJECT_ID: number = 1
  private readonly TEST_SUITE_ID: number = 1

  // private readonly TEST_CASE_MANUAL: number = 1
  private readonly TEST_CASE_AUTOMATED: number = 2

  private readonly TEST_TYPE_REGRESSION: number = 1
  private readonly TEST_TYPE_SMOKE: number = 3

  // Firmware Version Check testcases folder in testrail
  private readonly FIRMWARE_CHECK_FOLDER: number = 4744
  // Resource Consumption folder in testrail
  private readonly RESOURCE_CONSUMPTION_FOLDER: number = 6721

  private readonly API_GET_LIMIT: number = 250
  private readonly API_GET_OFFSET: number = 0


  public constructor() {
    this._testrail = new TestRail({
      host: process.env.TESTRAIL_HOST_NAME,
      user: process.env.TESTRAIL_USER_NAME,
      password: process.env.TESTRAIL_API_KEY,
    })
  }

  public async addResultForCase(
    test_run_id: number,
    test_case_id: number,
    status: boolean,
    comment: string | undefined,
    elapsed: string | undefined
  ): Promise<TestCaseResult | undefined> {
    const status_id: number = status == true ? this.PASSED : this.FAILED

    const data: TestCaseResultPayload = {
      status_id,
      comment,
      elapsed,
    }
    console.log("host: ", process.env.TESTRAIL_HOST_NAME)
    // const result: PromiseResult = await this._testrail.addResultForCase(test_run_id, test_case_id, data, undefined)
    const result: PromiseResult = await this._testrail.addResultForCase(test_run_id, test_case_id, data, 'a')

    return result.body
  }

  public async addResultsForCases(testRunId: any, testCaseResults: any) {
    const result = await this._testrail.addResultsForCases(testRunId, testCaseResults)
    return result.body
  }

  public async checkTestRunExists(testRunName: string) {
    console.log(`    (*Using test run: ${testRunName}*)`)

    const testRun = await this.getRunByName(testRunName)
    if (testRun) {
      console.log(`    (*Found "${testRunName}" in TestRail*)`)
      console.log(`    (*Use "${testRunName}" in TestRail*)`)
      return testRun
    } else {
      console.log(`    (*Cannot find "${testRunName}" in TestRail*)`)
      console.log(`    (*Create "${testRunName}" in TestRail*)`)
      return false
    }
  }

  public async createNewRun(name: string, commandArray: string[]): Promise<TestRunResult | undefined> {
    const case_ids = await this.getAutomatedCaseIds(commandArray)
    const data: TestRunCreatePayload = {
      suite_id: this.TEST_SUITE_ID,
      name: name,
      include_all: false,
      case_ids,
    }

    const result: PromiseResult = await this._testrail.addRun(this.CAM_PROJECT_ID, data, undefined)

    return result.body
  }

  public async getRunByName(name: string): Promise<TestRunResult | undefined> {
    let testRuns: TestRunResult[] = []
    const offsetArray: number[] = []
    // Calculate the total number of offsets needed to retrieve all the test runs
    let checkLastOffset = this.API_GET_OFFSET
    let hasNext = undefined
    while (hasNext !== null) {
      const result: PromiseResult = await this._testrail.getRuns(
        this.CAM_PROJECT_ID,
        { offset: checkLastOffset },
        undefined
      )
      hasNext = result.body._links.next
      offsetArray.push(checkLastOffset)
      checkLastOffset += this.API_GET_LIMIT
    }

    // Use Promise.all to send requests for test runs in parallel
    const promises = await offsetArray.map(async offset => {
      const result: PromiseResult = await this._testrail.getRuns(this.CAM_PROJECT_ID, { offset }, undefined)
      testRuns = testRuns.concat(result.body.runs)
    })
    await Promise.all(promises)

    // Search for the test run with the specified name
    for (const run of testRuns) {
      if (run.name == name) {
        return run
      }
    }
    return undefined
  }

  public async getAutoCasesList(testrun: number) {
    let testCases: TestCaseResult[] = []

    let hasNext = undefined
    let startOffset = this.API_GET_OFFSET
    while (hasNext !== null) {
      const cases: PromiseResult = await this._testrail.getTests(testrun, { offset: startOffset }, undefined)
      hasNext = cases.body._links.next
      startOffset += this.API_GET_LIMIT
      testCases = testCases.concat(cases.body.tests)
    }

    return testCases
  }

  public async getCaseId(name: string, caseList: string) {
    const caseListJson = JSON.parse(caseList)
    const targetCase = caseListJson.find((item: any) => item.title === name)

    return targetCase !== undefined ? targetCase : undefined
  }

  public async getCaseIdByName(name: string): Promise<TestCaseResult | undefined> {
    let testCases: TestCaseResult[] = []
    const offsetArray: number[] = []

    // Calculate the total number of offsets needed to retrieve all the test cases
    let checkLastOffset = this.API_GET_OFFSET
    let hasNext = undefined
    while (hasNext !== null) {
      const result: PromiseResult = await this._testrail.getCases(
        this.CAM_PROJECT_ID,
        { filter: name, offset: checkLastOffset },
        undefined
      )
      hasNext = result.body._links.next
      offsetArray.push(checkLastOffset)
      checkLastOffset += this.API_GET_LIMIT
    }

    // Use Promise.all to send requests for test cases in parallel
    const promises = await offsetArray.map(async offset => {
      const result: PromiseResult = await this._testrail.getCases(
        this.CAM_PROJECT_ID,
        { filter: name, offset },
        undefined
      )
      testCases = testCases.concat(result.body.cases)
    })
    await Promise.all(promises)

    // Return the first test case if it exists, otherwise return undefined
    const output: TestCaseResult | undefined = testCases.length == 1 ? testCases[0] : undefined
    return output
  }

  private async getAutomatedCaseIds(commandArray: string[]): Promise<number[]> {
    let testCases: TestCaseResult[] = []
    const offsetArray: number[] = []

    let checkLastOffset = this.API_GET_OFFSET
    let hasNext = undefined

    while (hasNext !== null) {
      const data = { offset: checkLastOffset }
      const result = await this._testrail.getCases(this.CAM_PROJECT_ID, data, undefined)
      hasNext = result.body._links.next
      offsetArray.push(checkLastOffset)
      checkLastOffset += this.API_GET_LIMIT
    }

    const promises = await offsetArray.map(async offset => {
      const data = { offset: offset }
      const result: PromiseResult = await this._testrail.getCases(this.CAM_PROJECT_ID, data, undefined)
      testCases = testCases.concat(result.body.cases)
    })
    await Promise.all(promises)

    /**
     * Get tags from the command
     * ex. pnpm run wdio "@N7-Z490 or @N7-Z590"
     * 1. Extract the tag part -> "@N7-Z490 or @N7-Z590"
     * 2. Split the tag part -> "@N7-Z490", "or", "@N7-Z590"
     */

    const commandOperation: string[] = []
    // Create the test machine list: ['@N7-Z370', '@N7-Z390', ......]
    const testMachineList = Object.values(TEST_MACHINE)
      .filter(value => typeof value === 'string')
      .map(testMachine => '@' + testMachine)

    /**
     * First tier of tags: @all @smoketest
     * - Add all of @all or @smoketest tags into testcases if command includes these tags
     */
    if (commandArray.includes('@all')) {
      return this.getAllTestCaseIds(testCases)
    } else if (commandArray.includes('@smoketest')) {
      return this.getSmokeTestCaseIds(testCases)
    }

    /**
     * Second tier of tags: @machine @fw @resource
     * Operation tag: "and" "or"
     * - Add corresponding tags testcases into testrun
     * - Add "and" "or" into array commandOperation
     */
    const automatedTestCaseIds: any[] = []
    for (let commandArg of commandArray) {
      commandArg = commandArg.replace(/[()]/g, '')
      if (testMachineList.includes(commandArg)) {
        const machineTestCaseIds = this.getMachineTestCaseIds(testCases, commandArg)
        automatedTestCaseIds.push(machineTestCaseIds)
      } else if (commandArg === '@fw') {
        automatedTestCaseIds.push(this.getFirmwareCaseIds(testCases))
      } else if (commandArg === '@resource') {
        automatedTestCaseIds.push(this.getResourceCaseIds(testCases))
      } else if (commandArg === 'and' || commandArg === 'or') {
        commandOperation.push(commandArg)
      }
    }

    return this.getTagTestCaseIds(commandOperation, automatedTestCaseIds)
  }

  /**
   * "and" "or"
   * We will get each tags testcases' ids, then we will do the following work
   * 1. "and": Get the intersection of two testcases ids list
   * 2. "or" : Get the set of two testcases ids list
   */
  getTagTestCaseIds(commandOperation: string[], automatedTestCaseIds: any[]): number[] | PromiseLike<number[]> {
    let tagAutomatedTestCaseId = []

    if (commandOperation.length === 0) {
      tagAutomatedTestCaseId = automatedTestCaseIds[0]
      return tagAutomatedTestCaseId
    }

    for (let count = 0; count < commandOperation.length; count++) {
      if (commandOperation[count] === 'and') {
        automatedTestCaseIds[count + 1] = intersection(automatedTestCaseIds[count], automatedTestCaseIds[count + 1])
      } else if (commandOperation[count] === 'or') {
        automatedTestCaseIds[count + 1] = union(automatedTestCaseIds[count], automatedTestCaseIds[count + 1])
      }
    }

    tagAutomatedTestCaseId = automatedTestCaseIds.pop()
    return tagAutomatedTestCaseId
  }

  /**
   * @all tag
   * Add all automated testcases into testrun
   */
  getAllTestCaseIds(testCases: TestCaseResult[]): number[] | PromiseLike<number[]> {
    const automatedTestCaseId: any[] = []
    for (const testCase of testCases) {
      if (
        testCase.custom_automation_type == this.TEST_CASE_AUTOMATED &&
        testCase.custom_test_type?.includes(this.TEST_TYPE_REGRESSION)
      ) {
        automatedTestCaseId.push(testCase.id)
      }
    }
    return automatedTestCaseId
  }

  /**
   * @smoketest tag
   * Check the test case type is "Smoke & Sanity" and automation type is "Automated"
   */
  getSmokeTestCaseIds(testCases: TestCaseResult[]): number[] | PromiseLike<number[]> {
    const automatedTestCaseId: any[] = []
    for (const testCase of testCases) {
      if (
        testCase.custom_automation_type == this.TEST_CASE_AUTOMATED &&
        testCase.custom_test_type?.includes(this.TEST_TYPE_SMOKE)
      ) {
        automatedTestCaseId.push(testCase.id)
      }
    }
    return automatedTestCaseId
  }

  /**
   * @fw tag
   * Firmware check testcases are in folder "Firmware Version"
   */
  getFirmwareCaseIds(testCases: TestCaseResult[]): number[] | PromiseLike<number[]> {
    const automatedTestCaseId: number[] = []
    for (const testCase of testCases) {
      if (
        testCase.custom_automation_type == this.TEST_CASE_AUTOMATED &&
        testCase.section_id == this.FIRMWARE_CHECK_FOLDER
      ) {
        automatedTestCaseId.push(testCase.id)
      }
    }
    return automatedTestCaseId
  }

  /**
   * @machine tag ex. @N7-Z490, @N7-B550
   * We only focus on test machine, ignore 'and' 'or'
   * Select the testcases which are automated field and have test machines customized field
   */
  getMachineTestCaseIds(testCases: TestCaseResult[], commandArg: string): number[] | PromiseLike<number[]> {
    const automatedTestCaseId: any[] = []
    for (const testCase of testCases) {
      // Check testcase has test machine filed
      if (!testCase.custom_test_machine) continue
      if (
        testCase.custom_automation_type == this.TEST_CASE_AUTOMATED &&
        TEST_MACHINE[parseInt(testCase.custom_test_machine)] == commandArg.replace('@', '')
      ) {
        automatedTestCaseId.push(testCase.id)
      }
    }
    return automatedTestCaseId
  }

  /**
   * @resource tag
   * Resource testcases are in folder "Resource Consumption"
   */
  getResourceCaseIds(testCases: TestCaseResult[]): number[] | PromiseLike<number[]> {
    const automatedTestCaseId: number[] = []
    for (const testCase of testCases) {
      if (
        testCase.custom_automation_type == this.TEST_CASE_AUTOMATED &&
        testCase.section_id == this.RESOURCE_CONSUMPTION_FOLDER
      ) {
        automatedTestCaseId.push(testCase.id)
      }
    }
    return automatedTestCaseId
  }

  public getTestRun(): string {
    // get the test run name send by `--test-run="myTestRun"`
    return process.env.TEST_RUN_NAME ? process.env.TEST_RUN_NAME : ''
  }

  public async updateStepsToCase(case_id: number, steps: string): Promise<PromiseResult> {
    const response: PromiseResult = await this._testrail.updateCase(case_id, { custom_steps: steps }, undefined)
    return response
  }

  public async isTestCaseInTestRun(caseName: string, runName: string): Promise<boolean> {
    const targetTestRun = await this.getRunByName(runName)
    const testRunId = targetTestRun?.id
    const testCaseName = caseName

    let offset = 0
    let hasNext = undefined
    while (hasNext !== null) {
      const result: PromiseResult = await this._testrail.getTests(testRunId, { offset }, undefined)
      for (const test of result.body.tests) {
        if (test.title == testCaseName) {
          return true
        }
      }
      offset += this.API_GET_LIMIT
      hasNext = result.body._links.next
    }

    return false
  }
}

export function millisecondsToTestrailTimeFormat(milliseconds: number): string {
  let output = ''
  let seconds = Math.floor(milliseconds / 10) // divided by 10 because result.duration seems to be seconds * 10
  const minutes = Math.floor(seconds / 60)
  seconds %= 60
  if (minutes) {
    output += `${minutes}m`
  }
  if (seconds) {
    output += `${seconds}s`
  }
  return output
}

export default new TestRailClient()
