import { save } from '@tauri-apps/api/dialog'
import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs'
import { appDataDir, downloadDir, join, resolveResource } from '@tauri-apps/api/path'
import { ChildProcess } from '@tauri-apps/api/shell'

import { UserData } from '../../../types/storage'
import { generateResponse } from '../types/generateResponse'
import { generateV2Request } from '../types/generateV2Request'

export const CVGenerationService = {
  askOutputPath: async (): Promise<string | null> => {
    console.count('ask output')
    let data: UserData
    try {
      data = JSON.parse(
        await readTextFile('data.json', {
          dir: BaseDirectory.AppData
        })
      )
    } catch (error) {
      console.error('Error accessing the content data file:', error)
      throw Error(`Error accessing the content data file: ${error}`)
    }

    const defaultFileName = `CV_${data.lastname}_${data.firstname}_${data.entity}`.replace(/_$/, '')

    try {
      const filePath = await save({
        defaultPath: (await downloadDir()) + '/' + defaultFileName + '.pptx'
      })
      if (!filePath) {
        console.warn('Filepath is wrong')
        return null
      }
      return filePath
    } catch {
      throw Error('Error on open save dialog')
    }
  },
  connected: async (): Promise<ChildProcess> => {
    const baseURL = 'http://localhost:8008'

    const response = await fetch(`${baseURL}/api/v1/connect`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const output = await response.json()
    return output
  },
  generate: async (outputFilePath: string): Promise<generateResponse> => {
    const appDataDirPath = await appDataDir()
    const fileName = outputFilePath.split('/').slice(-1).join('')
    const outputFolderPath = outputFilePath.replace(fileName, '')
    const outputFileName = outputFilePath.replace(outputFolderPath, '').replace('.pptx', '')

    const baseURL = 'http://localhost:8008'

    console.log({ outputFolderPath })
    const response = await fetch(`${baseURL}/api/v1/generate-cv-pptx`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        output_filename: outputFileName,
        output_folder: outputFolderPath,
        path_data: await join(appDataDirPath, 'data.json'),
        path_template: await resolveResource(
          await join('resources', 'CV_Nom_Prenom_Capability.pptx')
        )
      })
    })
    const output = await response.json()

    return output
  },
  generateV2: async (
    outputFilePath: string,
    data: generateV2Request
  ): Promise<generateResponse> => {
    const fileName = outputFilePath.split('/').slice(-1).join('')
    const outputFolderPath = outputFilePath.replace(fileName, '')
    const outputFileName = outputFilePath.replace(outputFolderPath, '').replace('.pptx', '')

    const baseURL = 'http://localhost:8008'

    const response = await fetch(`${baseURL}/api/v2/generate-cv-pptx`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: data,
        output_filename: outputFileName,
        output_folder: outputFolderPath,
        path_template: await resolveResource(
          await join('resources', 'CV_Nom_Prenom_Capability.pptx')
        )
      })
    })
    const output = await response.json()

    return output
  }
}
