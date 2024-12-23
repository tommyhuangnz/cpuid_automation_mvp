import * as childProcess from 'child_process'
import * as fs from 'fs'
import path from 'path'

const camCoreVersion1 = '69.0.0' // Replace with the first desired version
const camCoreVersion2 = '69.1.0' // Replace with the second desired version
const jsonFilePath = './cpuid_reading.json' // Path to the JSON file

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}
// Function to run shell commands
function runCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`)
      } else {
        resolve(stdout)
      }
    })
  })
}

// Function to ensure the JSON file does not exist before proceeding
function ensureJsonFileDoesNotExist(filePath: string): void {
  if (fs.existsSync(filePath)) {
    console.log(`File ${filePath} exists, deleting it...`)
    fs.unlinkSync(filePath) // Deletes the file
    console.log(`File ${filePath} has been deleted.`)
  } else {
    console.log(`File ${filePath} does not exist, no need to delete.`)
  }
}

// Function to install a specific version of cam-core
export async function installCamCore(version: string): Promise<void> {
  console.log(`Installing cam-core version ${version}...`)
  try {
    await runCommand(`pnpm install @nzxt/cam-core@${version}`)
    console.log(`Successfully installed cam-core version ${version}`)
  } catch (error) {
    console.error(`Error installing cam-core version ${version}: ${error}`)
  }
}

// Function to read temperature from the JSON file
function readTemperatureFromJSON(filePath: string, version: string): number | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    console.log('file content: ', fileContent)
    const data = JSON.parse(fileContent)

    if (data[version]) {
      return data[version].temperature
    } else {
      throw new Error(`Temperature data not found for version ${version}.`)
    }
  } catch (error) {
    console.error(`Error reading temperature from JSON file: ${error}`)
    return null
  }
}

// Function to run the TypeScript script and get the temperature
export async function runTempScript(fileName: string): Promise<void> {
  console.log(`Running script: ${fileName}...`)
  try {
    // Run the TypeScript script and get the temperature value
    const result = await runCommand(`ts-node ${fileName}`)
  } catch (error) {
    console.error(`Error running script: ${error}`)
    throw error
  }
}

// Function to check if two temperatures are within 5% of each other
function isWithinAcceptanceRate(temp1: number, temp2: number): boolean {
  const difference = Math.abs(temp1 - temp2)
  const maxDifference = 0.05 * Math.max(temp1, temp2) // 5% of the larger value
  return difference <= maxDifference
}

async function main() {
  const tempCalcScriptPath = path.resolve(__dirname, './get_cpu_avg_temp.ts')
  ensureJsonFileDoesNotExist(jsonFilePath)

  // Step 1: Install cam-core version 1.
  // await installCamCore(camCoreVersion1)

  // Step 2: Read the temperature from the JSON file for the first version
  await runTempScript(tempCalcScriptPath)
  // const temp1 = readTemperatureFromJSON(jsonFilePath, camCoreVersion1)
  // if (temp1 === null) {
  //   console.error('Failed to read temperature from the JSON file for the first version.')
  //   return
  // }

  // Step 3: Install cam-core version 2
  // await installCamCore(camCoreVersion2)

  // Step 4: Read the temperature from the JSON file for the second version
  // await runTempScript(tempCalcScriptPath)
  // const temp2 = readTemperatureFromJSON(jsonFilePath, camCoreVersion2)
  // if (temp2 === null) {
  //   console.error('Failed to read temperature from the JSON file for the second version.')
  //   return
  // }

  // Step 5: Compare the temperatures
  // if (isWithinAcceptanceRate(temp1, temp2)) {
  //   console.log('The temperatures are within 5% of each other.')
  // } else {
  //   console.log('The temperatures are NOT within 5% of each other.')
  // }
  console.log('finished')
}

// async function main() {
//   installCamCore('69.0.0')
// }

// Run the main function
main().catch(err => {
  console.error('Error occurred:', err)
})
