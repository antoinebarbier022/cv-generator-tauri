import { emptyInitialResume } from '@/constants/empty-initial-resume'
import { UserData } from '@/types/storage'
import { ResumeValidationSchemaForImportation } from '@/validations/dataContentValidationSchema'
import { getVersion } from '@tauri-apps/api/app'
import { open } from '@tauri-apps/api/dialog'
import {
  BaseDirectory,
  createDir,
  exists,
  readBinaryFile,
  readTextFile,
  renameFile,
  writeBinaryFile,
  writeTextFile
} from '@tauri-apps/api/fs'
import { appDataDir, extname, join, pictureDir } from '@tauri-apps/api/path'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { format } from 'date-fns'

const CONTENT_DATA_FILE = `data.json`

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
    await renameFile(CONTENT_DATA_FILE, `data--${formattedDate}--${appVersion}.json`, {
      dir: BaseDirectory.AppData
    })

    const isExistAppDataDirPath = await StorageService.isAppDataDir()
    if (isExistAppDataDirPath) {
      await StorageService.createAppDataDir()
    }

    try {
      await writeTextFile(
        {
          path: CONTENT_DATA_FILE,
          contents: JSON.stringify(emptyInitialResume)
        },
        { dir: BaseDirectory.AppData }
      )
    } catch (writeFileError) {
      console.error('Failed to reset content data file:', writeFileError)
      throw new Error('Failed to reset content data file')
    }
  },
  isContentDataFile: async (): Promise<boolean> => {
    return await exists(CONTENT_DATA_FILE, {
      dir: BaseDirectory.AppData
    })
  },
  isAppDataDir: async (): Promise<boolean> => {
    return await exists(await appDataDir())
  },
  createAppDataDir: async (): Promise<void> => {
    try {
      await createDir(await appDataDir(), { recursive: true })
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
        dir: BaseDirectory.AppData
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

  setContentData: async ({ values }: { values: UserData }): Promise<UserData> => {
    console.log({ values })
    const isExistAppDataDirPath = await StorageService.isAppDataDir()
    if (isExistAppDataDirPath) {
      await StorageService.createAppDataDir()
    }

    try {
      await writeTextFile(
        { path: CONTENT_DATA_FILE, contents: JSON.stringify(values) },
        { dir: BaseDirectory.AppData }
      )
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
        await createDir(suggestedAppDataPath, { recursive: true })
      }
    } catch (error) {
      console.error('Error create folder appDataDir:', error)
      throw error
    }

    try {
      const extension = await extname(filePath as string)
      const picture = await readBinaryFile(filePath as string)
      await writeBinaryFile(
        {
          path: `profile.${extension}`,
          contents: picture
        },
        { dir: BaseDirectory.AppData }
      )
      return await join(await appDataDir(), `profile.${extension}`)
    } catch (error) {
      console.error('Error write image inside AppDataDir:', error)
      throw error
    }
  }
}
