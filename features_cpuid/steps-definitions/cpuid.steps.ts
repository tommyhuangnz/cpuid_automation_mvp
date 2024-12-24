import { When, setDefaultTimeout } from '@cucumber/cucumber'
import { exec, spawn } from 'child_process'
import * as path from 'path'
import { promisify } from 'util'
// import { strict as assert } from 'assert'
// const { Given, When, Then } = require('@cucumber/cucumber')
// const assert = require('assert')
console.log('pATH: : ')
const pnpmPath = path.join('C:Users\tommyDesktopworkspacecerberuspackagese2e-test-v2', 'node_modules', '.bin', 'pnpm')
// Promisify exec for async/await support
const execPromise = promisify(exec)
///

// Function to run shell commands
function runCommand(command: string, timeout: number = 30000): Promise<string> {
  return new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`)
        return
      }
      resolve(stdout || stderr)
    })

    const timer = setTimeout(() => {
      process.kill() // Kill the process if it takes too long
      reject(new Error('Command timed out'))
    }, timeout)

    process.on('close', () => {
      clearTimeout(timer) // Clear the timeout if the process exits normally
    })
  })
}
///

var number1 = 0
setDefaultTimeout(40000)
const runPowerShellCommand = () => {
  const psScript = `
  Push-Location -Path "C:\\Users\\tommy\\Desktop\\workspace\\test_sep_pnpm";
  pnpm install;
  Pop-Location
  `
  const encodedCommand = Buffer.from(psScript, 'utf16le').toString('base64')
  const psProcess = spawn('powershell.exe', ['-NoProfile', '-EncodedCommand', encodedCommand], {
    stdio: 'inherit', // Directs child process I/O to the parent
    env: process.env, // Inherit environment variables
    shell: true, // Ensures the PowerShell shell is used
  })

  psProcess.on('close', code => {
    if (code === 0) {
      console.log('Command executed successfully.')
    } else {
      console.error(`Command exited with code ${code}.`)
    }
  })

  psProcess.on('error', error => {
    console.error(`Failed to start process: ${error.message}`)
  })
}

const get_temps = () => {
  const psScript = `
  Push-Location -Path "C:\\Users\\tommy\\Desktop\\workspace\\test_sep_pnpm";
  ts-node ./cpuid_helpers/validate_cupid_cpu_temps.ts;
  Pop-Location
  `
  const encodedCommand = Buffer.from(psScript, 'utf16le').toString('base64')
  const psProcess = spawn('powershell.exe', ['-NoProfile', '-EncodedCommand', encodedCommand], {
    stdio: 'inherit', // Directs child process I/O to the parent
    env: process.env, // Inherit environment variables
    shell: true, // Ensures the PowerShell shell is used
  })

  psProcess.on('close', code => {
    if (code === 0) {
      console.log('Command executed successfully.')
    } else {
      console.error(`Command exited with code ${code}.`)
    }
  })

  psProcess.on('error', error => {
    console.error(`Failed to start process: ${error.message}`)
  })
}

// runPowerShellCommand()

When('I have installed pnpm packages in the cpuid_test environment', async function () {
  try {
    runPowerShellCommand()
  } catch (error) {
    console.error('Error during pnpm install:', error)
    throw error
  }
})

// const module_path = path.resolve(__dirname, '../cpuid_helpers/validate_cpuid_cpu_temps')
// const { installCamCore, runTempScript } = require(module_path)

// When('install cam-core ver {string}', async function (ver: string) {
//   console.log(`Starting installation of cam-core version ${ver}...`)
//   try {
//     await installCamCore(ver)
//     // if (stderr) {
//     //   console.error(`stderr: ${stderr}`)
//     // }

//     // console.log(`stdout: ${result}`)
//   } catch (error) {
//     console.error(`Error installing package: ${error}`)
//     console.error(error.stack)
//   }
// })

When('Compute CPU Temperature data for 5 seconds', async () => {
  // const tempCalcScriptPath = '../../cpuid_helpers/get_cpu_avg_temp.ts'
  console.log('Getting CPU Avg Temps...')
  // await get_cpu_avg_temps()
  // await get_temps()
  console.log('FINISHED!!')
})

// Then('the acceptance rate is below 5s', () => {})
