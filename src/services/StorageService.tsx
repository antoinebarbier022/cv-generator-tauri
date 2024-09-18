import { emptyInitialResume } from '@/constants/empty-initial-resume'
import { UserData } from '@/types/storage'
import { ResumeValidationSchemaForImportation } from '@/validations/dataContentValidationSchema'

import { getVersion } from '@tauri-apps/api/app'
import { convertFileSrc } from '@tauri-apps/api/core'
import { appDataDir, extname, join, pictureDir } from '@tauri-apps/api/path'
import { open } from '@tauri-apps/plugin-dialog'
import {
  BaseDirectory,
  exists,
  mkdir,
  readFile,
  readTextFile,
  rename,
  stat,
  writeFile,
  writeTextFile
} from '@tauri-apps/plugin-fs'
import { format } from 'date-fns'
const CONTENT_DATA_FILE = import.meta.env.DEV ? `[DEBUG]-data.json` : `data.json`

export const StorageService = {
  importContentData: async (): Promise<any | null> => {
    const selected = await open({
      multiple: false,
      filters: [
        {
          name: 'Json',
          extensions: ['json']
        }
      ]
    })
    if (selected) {
      const text = JSON.parse(await readTextFile(selected as string))
      await ResumeValidationSchemaForImportation.validate(text as UserData)
      await StorageService.resetContentData()
      await StorageService.setContentData({ values: text })
      return text
    } else {
      return null
    }
  },
  resetContentData: async (): Promise<void> => {
    const appVersion = await getVersion()
    const formattedDate = format(new Date(), 'yyyy-MM-dd_HH-mm')
    await rename(CONTENT_DATA_FILE, `data--${formattedDate}--${appVersion}.json`, {
      oldPathBaseDir: BaseDirectory.AppData,
      newPathBaseDir: BaseDirectory.AppData
    })

    const isExistAppDataDirPath = await StorageService.isAppDataDir()
    if (isExistAppDataDirPath) {
      await StorageService.createAppDataDir()
    }

    try {
      await writeTextFile(
        CONTENT_DATA_FILE,
        JSON.stringify(emptyInitialResume),

        { baseDir: BaseDirectory.AppData }
      )
    } catch (writeFileError) {
      console.error('Failed to reset content data file:', writeFileError)
      throw new Error('Failed to reset content data file')
    }
  },
  isContentDataFile: async (): Promise<boolean> => {
    return await exists(CONTENT_DATA_FILE, {
      baseDir: BaseDirectory.AppData
    })
  },
  isAppDataDir: async (): Promise<boolean> => {
    return await exists(await appDataDir())
  },
  createAppDataDir: async (): Promise<void> => {
    try {
      await mkdir(await appDataDir(), { recursive: true })
    } catch (error) {
      console.error('Error create folder appDataDir:', error)
      throw error
    }
  },
  getContentData: async (): Promise<UserData> => {
    let data
    try {
      const existFile = await StorageService.isContentDataFile()

      if (!existFile) {
        console.warn(`File ${CONTENT_DATA_FILE} does not exist. Returning empty initial content.`)
        return emptyInitialResume
      }

      data = await readTextFile(CONTENT_DATA_FILE, {
        baseDir: BaseDirectory.AppData
      })
    } catch (error) {
      console.error('Error accessing the content data file:', error)
      return emptyInitialResume
    }

    try {
      return JSON.parse(data) as UserData
    } catch (jsonError) {
      console.error('Failed to parse JSON data:', jsonError)
      throw Error(`Failed to parse JSON data:${jsonError}`)
    }
  },

  getLastModified: async (): Promise<Date | null> => {
    const meta_properties = await stat(CONTENT_DATA_FILE, { baseDir: BaseDirectory.AppData })
    console.log(meta_properties)
    return meta_properties.mtime
  },

  setContentData: async ({ values }: { values: UserData }): Promise<UserData> => {
    console.log({ values })
    const isExistAppDataDirPath = await StorageService.isAppDataDir()
    if (isExistAppDataDirPath) {
      await StorageService.createAppDataDir()
    }

    try {
      await writeTextFile(CONTENT_DATA_FILE, JSON.stringify(values), {
        baseDir: BaseDirectory.AppData
      })
    } catch (writeFileError) {
      console.error('Failed to write file:', writeFileError)
      throw new Error('Failed to write content data file')
    }
    return values
  },

  getImageProfile: async (pictureFilePath: string): Promise<string> => {
    return pictureFilePath ? convertFileSrc(pictureFilePath) : ''
  },

  setImageProfile: async (): Promise<string | null> => {
    let filePath
    try {
      filePath = await open({
        defaultPath: await pictureDir(),
        filters: [
          {
            name: 'Image',
            extensions: ['png', 'jpeg', 'jpg']
          }
        ]
      })

      if (filePath === null) {
        return null
      }
    } catch (error) {
      console.error('Error open dialog:', error)
      throw error
    }

    try {
      const suggestedAppDataPath = await appDataDir()
      const isExistAppDataDirPath = await exists(suggestedAppDataPath)
      if (!isExistAppDataDirPath) {
        await mkdir(suggestedAppDataPath, { recursive: true })
      }
    } catch (error) {
      console.error('Error create folder appDataDir:', error)
      throw error
    }

    try {
      const extension = await extname(filePath as string)
      const picture = await readFile(filePath as string)
      const filename = import.meta.env.DEV ? `[DEBUG]-profile.${extension}` : `profile.${extension}`
      await writeFile(filename, picture, { baseDir: BaseDirectory.AppData })
      return await join(await appDataDir(), filename)
    } catch (error) {
      console.error('Error write image inside AppDataDir:', error)
      throw error
    }
  }
}
