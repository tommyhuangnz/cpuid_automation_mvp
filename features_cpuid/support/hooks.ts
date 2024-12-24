import { After } from '@cucumber/cucumber';
import TestRailClient, { millisecondsToTestrailTimeFormat } from './helper/integration_services/testrail'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })
const TEST_RUN_ID = 19685115; // Replace with your TestRail test run ID
const TEST_CASE_RESULT_PASSED = 1
const TEST_CASE_RESULT_FAILED = 5

// let TEST_CASE_RESULT_LIST = { results: [] }
// interface TestCaseResult {
//   case_name: string;
//   case_id: number;
//   status_id: number;
//   elapsed: string;
//   comment: string;
//   steps: string;
// }

// // After({ tags: '@applyHook' }, async function (scenario) {
//   After(async function (scenario) {
//   console.log('=== Test AfterScenario ===')
//     console.log('********* Check Result *********')
//     console.log('- TestCase  : ' + scenario.pickle.name)
//     console.log('- Passed    : ' + scenario.result?.status  )
//     console.log('********************************')
//     if (process.env.TEST_RUN_NAME) {
//       let scenarioName = scenario.pickle.name
//       scenarioName = scenarioName.replace(/"/g, '')
//       const testRunId = Number(process.env.TEST_RUN_ID)
//       // const testCase = await TestRailClient.getCaseId(scenarioName, process.env.TEST_RUN_CASE_LIST)
//       const testCase = 'CPU - Intel i7-10700KF in PC Monitoring CPU panel, Temperature in CAM should be same as that in CPUID HWMonitor'
//       const testCaseName: string = scenario.pickle.name
//       const testCaseId: number = 19685115
//       const status = scenario.result?.status == "PASSED"
//       const elapsed: string = `NA seconds`
//       // For the result error log, remove the color ascii code by regular expression
//       let comment: string = scenario.result?.status == 'PASSED' ? 'Automation Passed' : 'Automation Failed'
//       const statusId =  status == true ? TEST_CASE_RESULT_PASSED : TEST_CASE_RESULT_FAILED
//       const steps = "No Steps"
//       let newResult = {
//         case_name: testCaseName,
//         case_id: testCaseId,
//         status_id: statusId,
//         elapsed: elapsed,
//         comment: comment,
//         steps: steps,
//       }
//       console.log('##### Test Case Result to TestRail #####')
//       console.log(newResult)
//       console.log('########################################')
//       // TEST_CASE_RESULT_LIST.results.push(newResult)
//       // // Update the test step of test case
//       // TestRailClient.updateStepsToCase(testCaseId, steps)
//       await TestRailClient.addResultForCase(testRunId, testCaseId, status, comment, elapsed)
//     }
// });
