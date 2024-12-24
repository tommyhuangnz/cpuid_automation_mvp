import { stringify } from 'querystring'
import request from 'request'
import { delay } from '../helper/common_utils/delay'

// ----- API Reference: http://docs.gurock.com/testrail-api2/start -----

class TestRail {
  constructor(options) {
    this.host = options.host
    this.user = options.user
    this.password = options.password

    this.uri = '/index.php?/api/v2/'
  }
  apiGet(apiMethod, queryVariables, callback) {
    var url = this.host + this.uri + apiMethod

    if (typeof queryVariables == 'function') {
      callback = queryVariables
      queryVariables = null
    }

    return this._callAPI('get', url, queryVariables, null, callback)
  }
  apiPost(apiMethod, body, queryVariables, callback) {
    var url = this.host + this.uri + apiMethod

    if (typeof body == 'function') {
      callback = body
      queryVariables = body = null
    } else if (typeof queryVariables == 'function') {
      callback = queryVariables
      queryVariables = null
    }

    return this._callAPI('post', url, queryVariables, body, callback)
  }
  _callAPI(method, url, queryVariables, body, callback, retryCount = 5) {
    if (queryVariables != null) {
      url += '&' + stringify(queryVariables)
    }
    const requestArguments = {
      rejectUnauthorized: false,
      uri: url,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    }

    if (body != null) {
      requestArguments.body = body
    }

    const makeRequest = (resolve, reject, retriesLeft) => {
      request[method](requestArguments, async function (err, res, body) {
        if (err) {
          return reject(err)
        }

        console.log(`Request API: ${requestArguments.uri}`)

        const responseBody = body === '' ? JSON.stringify({}) : body
        if (res.statusCode !== 200) {
          if (retriesLeft > 0) {
            console.log(`> Retrying after 30 seconds... ${retriesLeft} retries left`)
            await delay(30000)
            return makeRequest(resolve, reject, retriesLeft - 1)
          } else {
            let errData = body
            try {
              errData = JSON.parse(body)
            } catch (err) {
              return reject(err.message || err)
            }
            console.log(`✘ API status code: ${res.statusCode} with callback function`)
            if (typeof callback === 'function') {
              return callback(errData, res)
            } else {
              return reject({
                message: errData,
                response: res,
              })
            }
          }
        }
        console.log(`➡ API status code: ${res.statusCode} with callback function`)
        if (typeof callback === 'function') {
          return callback(null, res, JSON.parse(responseBody))
        } else {
          return resolve({
            response: res,
            body: JSON.parse(responseBody),
          })
        }
      }).auth(this.user, this.password, true)
    }

    if (typeof callback === 'function') {
      return new Promise((resolve, reject) => {
        makeRequest(resolve, reject, retryCount)
      })
    } else {
      return new Promise((resolve, reject) => {
        makeRequest(resolve, reject, retryCount)
      })
    }
  }
  // ----- Cases -----
  getCase(id, callback) {
    return this.apiGet('get_case/' + id, callback)
  }
  getCases(project_id, filters, callback) {
    var uri = 'get_cases/' + project_id

    if (typeof filters == 'function') {
      callback = filters
      return this.apiGet(uri, callback)
    } else {
      return this.apiGet(uri, filters, callback)
    }
  }
  addCase(section_id, data, callback) {
    return this.apiPost('add_case/' + section_id, JSON.stringify(data), callback)
  }
  updateCase(case_id, data, callback) {
    return this.apiPost('update_case/' + case_id, JSON.stringify(data), callback)
  }
  deleteCase(case_id, callback) {
    return this.apiPost('delete_case/' + case_id, callback)
  }
  // ----- Case Fields -----
  getCaseFields(callback) {
    return this.apiGet('get_case_fields', callback)
  }
  // ----- Case Types -----
  getCaseTypes(callback) {
    return this.apiGet('get_case_types', callback)
  }
  // ----- Configurations -----
  getConfigs(project_id, callback) {
    return this.apiGet('get_configs/' + project_id, callback)
  }
  addConfigGroup(project_id, data, callback) {
    return this.apiPost('add_config_group/' + project_id, JSON.stringify(data), callback)
  }
  addConfig(config_group_id, data, callback) {
    return this.apiPost('add_config/' + config_group_id, JSON.stringify(data), callback)
  }
  updateConfigGroup(config_group_id, data, callback) {
    return this.apiPost('update_config_group/' + config_group_id, JSON.stringify(data), callback)
  }
  updateConfig(config_id, data, callback) {
    return this.apiPost('update_config/' + config_id, JSON.stringify(data), callback)
  }
  deleteConfigGroup(config_group_id, callback) {
    return this.apiPost('delete_config_group/' + config_group_id, callback)
  }
  deleteConfig(config_id, callback) {
    return this.apiPost('delete_config/' + config_id, callback)
  }
  // ----- Milestones -----
  getMilestone(id, callback) {
    return this.apiGet('get_milestone/' + id, callback)
  }
  getMilestones(project_id, filters, callback) {
    var uri = 'get_milestones/' + project_id

    if (typeof filters == 'function') {
      callback = filters
      return this.apiGet(uri, callback)
    } else {
      return this.apiGet(uri, filters, callback)
    }
  }
  addMilestone(project_id, data, callback) {
    return this.apiPost('add_milestone/' + project_id, JSON.stringify(data), callback)
  }
  updateMilestone(milestone_id, data, callback) {
    return this.apiPost('update_milestone/' + milestone_id, JSON.stringify(data), callback)
  }
  deleteMilestone(milestone_id, callback) {
    return this.apiPost('delete_milestone/' + milestone_id, callback)
  }
  // ----- Plans -----
  getPlan(id, callback) {
    return this.apiGet('get_plan/' + id, callback)
  }
  getPlans(project_id, filters, callback) {
    var uri = 'get_plans/' + project_id

    if (typeof filters == 'function') {
      callback = filters
      return this.apiGet(uri, callback)
    } else {
      return this.apiGet(uri, filters, callback)
    }
  }
  addPlan(project_id, data, callback) {
    return this.apiPost('add_plan/' + project_id, JSON.stringify(data), callback)
  }
  addPlanEntry(plan_id, data, callback) {
    return this.apiPost('add_plan_entry/' + plan_id, JSON.stringify(data), callback)
  }
  updatePlan(plan_id, data, callback) {
    return this.apiPost('update_plan/' + plan_id, JSON.stringify(data), callback)
  }
  updatePlanEntry(plan_id, entry_id, data, callback) {
    return this.apiPost('update_plan_entry/' + plan_id + '/' + entry_id, JSON.stringify(data), callback)
  }
  closePlan(plan_id, callback) {
    return this.apiPost('close_plan/' + plan_id, callback)
  }
  deletePlan(plan_id, callback) {
    return this.apiPost('delete_plan/' + plan_id, callback)
  }
  deletePlanEntry(plan_id, entry_id, callback) {
    return this.apiPost('delete_plan_entry/' + plan_id + '/' + entry_id, callback)
  }
  // ----- Priorities -----
  getPriorities(callback) {
    return this.apiGet('get_priorities', callback)
  }
  // ----- Projects -----
  getProject(id, callback) {
    return this.apiGet('get_project/' + id, callback)
  }
  getProjects(filters, callback) {
    var uri = 'get_projects'

    if (typeof filters == 'function') {
      callback = filters
      return this.apiGet(uri, callback)
    } else {
      return this.apiGet(uri, filters, callback)
    }
  }
  addProject(data, callback) {
    return this.apiPost('add_project', JSON.stringify(data), callback)
  }
  updateProject(project_id, data, callback) {
    return this.apiPost('update_project/' + project_id, JSON.stringify(data), callback)
  }
  deleteProject(project_id, callback) {
    return this.apiPost('delete_project/' + project_id, callback)
  }
  // ----- Results -----
  getResults(test_id, filters, callback) {
    var uri = 'get_results/' + test_id

    if (typeof filters == 'function') {
      callback = filters
      return this.apiGet(uri, callback)
    } else {
      return this.apiGet(uri, filters, callback)
    }
  }
  getResultsForCase(run_id, case_id, filters, callback) {
    var uri = 'get_results_for_case/' + run_id + '/' + case_id

    if (typeof filters == 'function') {
      callback = filters
      return this.apiGet(uri, callback)
    } else {
      return this.apiGet(uri, filters, callback)
    }
  }
  getResultsForRun(run_id, filters, callback) {
    var uri = 'get_results_for_run/' + run_id

    if (typeof filters == 'function') {
      callback = filters
      return this.apiGet(uri, callback)
    } else {
      return this.apiGet(uri, filters, callback)
    }
  }
  addResult(test_id, data, callback) {
    return this.apiPost('add_result/' + test_id, JSON.stringify(data), callback)
  }
  addResultForCase(run_id, case_id, data, callback) {
    return this.apiPost('add_result_for_case/' + run_id + '/' + case_id, JSON.stringify(data), callback)
  }
  addResults(run_id, data, callback) {
    return this.apiPost(
      'add_results/' + run_id,
      JSON.stringify({
        results: data,
      }),
      callback
    )
  }
  addResultsForCases(run_id, data, callback) {
    return this.apiPost('add_results_for_cases/' + run_id, JSON.stringify(data), callback)
  }
  // ----- Result Fields -----
  getResultFields(callback) {
    return this.apiGet('get_result_fields', callback)
  }
  // ----- Runs -----
  getRun(id, callback) {
    return this.apiGet('get_run/' + id, callback)
  }
  getRuns(project_id, filters, callback) {
    var uri = 'get_runs/' + project_id

    if (typeof filters == 'function') {
      callback = filters
      return this.apiGet(uri, callback)
    } else {
      return this.apiGet(uri, filters, callback)
    }
  }
  addRun(project_id, data, callback) {
    return this.apiPost('add_run/' + project_id, JSON.stringify(data), callback)
  }
  updateRun(run_id, data, callback) {
    return this.apiPost('update_run/' + run_id, JSON.stringify(data), callback)
  }
  closeRun(run_id, callback) {
    return this.apiPost('close_run/' + run_id, callback)
  }
  deleteRun(run_id, callback) {
    return this.apiPost('delete_run/' + run_id, callback)
  }
  // ----- Sections -----
  getSection(id, callback) {
    return this.apiGet('get_section/' + id, callback)
  }
  getSections(project_id, filters, callback) {
    var uri = 'get_sections/' + project_id

    if (typeof filters == 'function') {
      callback = filters
      return this.apiGet(uri, callback)
    } else {
      return this.apiGet(uri, filters, callback)
    }
  }
  addSection(project_id, data, callback) {
    return this.apiPost('add_section/' + project_id, JSON.stringify(data), callback)
  }
  updateSection(section_id, data, callback) {
    return this.apiPost('update_section/' + section_id, JSON.stringify(data), callback)
  }
  deleteSection(section_id, callback) {
    return this.apiPost('delete_section/' + section_id, callback)
  }
  // ----- Statuses -----
  getStatuses(callback) {
    return this.apiGet('get_statuses', callback)
  }
  // ----- Suites -----
  getSuite(id, callback) {
    return this.apiGet('get_suite/' + id, callback)
  }
  getSuites(project_id, callback) {
    return this.apiGet('get_suites/' + project_id, callback)
  }
  addSuite(project_id, data, callback) {
    return this.apiPost('add_suite/' + project_id, JSON.stringify(data), callback)
  }
  updateSuite(suite_id, data, callback) {
    return this.apiPost('update_suite/' + suite_id, JSON.stringify(data), callback)
  }
  deleteSuite(suite_id, callback) {
    return this.apiPost('delete_suite/' + suite_id, callback)
  }
  // ----- Templates -----
  getTemplates(project_id, callback) {
    return this.apiGet('get_templates/' + project_id, callback)
  }
  // ----- Tests -----
  getTest(id, callback) {
    return this.apiGet('get_test/' + id, callback)
  }
  getTests(run_id, filters, callback) {
    var uri = 'get_tests/' + run_id

    if (typeof filters == 'function') {
      callback = filters
      return this.apiGet(uri, callback)
    } else {
      return this.apiGet(uri, filters, callback)
    }
  }
  // ----- Users -----
  getUser(id, callback) {
    return this.apiGet('get_user/' + id, callback)
  }
  getUserByEmail(email, callback) {
    return this.apiGet(
      'get_user_by_email',
      {
        email: email,
      },
      callback
    )
  }
  getUsers(callback) {
    return this.apiGet('get_users', callback)
  }
}

// ----------

export default TestRail
