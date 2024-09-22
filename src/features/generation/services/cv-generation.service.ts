import { appDataDir, downloadDir, join, resolveResource } from '@tauri-apps/api/path'
import { save } from '@tauri-apps/plugin-dialog'
import { BaseDirectory, readTextFile } from '@tauri-apps/plugin-fs'

import { invoke } from '@tauri-apps/api/core'
import { UserData } from '../../../core/storage/types/storage'
import { generateResponse } from '../types/generateResponse'
import { generateV2Request } from '../types/generateV2Request'

const DATA_FILENAME = import.meta.env.DEV ? `[DEBUG]-data.json` : `data.json`

export const CVGenerationService = {
  askOutputPath: async (): Promise<string | null> => {
    console.count('ask output')
    let data: UserData
    try {
      data = JSON.parse(
        await readTextFile(DATA_FILENAME, {
          baseDir: BaseDirectory.AppData
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
  generate: async ({ outputFilePath }: { outputFilePath: string }): Promise<generateResponse> => {
    const appDataDirPath = await appDataDir()
    const fileName = outputFilePath.split('/').slice(-1).join('')
    const outputFolderPath = outputFilePath.replace(fileName, '')
    const outputFileName = outputFilePath.replace(outputFolderPath, '').replace('.pptx', '')

    const api_port = await invoke<string>('get_backend_port')

    const baseURL = `http://localhost:${api_port}`

    const response = await fetch(`${baseURL}/api/v1/generate-cv-pptx`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        output_filename: outputFileName,
        output_folder: outputFolderPath,
        path_data: await join(appDataDirPath, DATA_FILENAME),
        path_template: await resolveResource(
          await join('resources', 'CV_Nom_Prenom_Capability.pptx')
        )
      })
    })
    const output = await response.json()

    return output
  },
  generateV2: async ({
    outputFilePath,
    data
  }: {
    outputFilePath: string
    data: generateV2Request
  }): Promise<generateResponse> => {
    const fileName = outputFilePath.split('/').slice(-1).join('')
    const outputFolderPath = outputFilePath.replace(fileName, '')
    const outputFileName = outputFilePath.replace(outputFolderPath, '').replace('.pptx', '')

    const api_port = await invoke<string>('get_backend_port')

    const baseURL = `http://localhost:${api_port}`

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
