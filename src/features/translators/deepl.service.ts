import { error } from '@tauri-apps/plugin-log'
import axios from 'axios'
import { DeepLUsage } from './deepl.types'


export const DeepLService = {
  usage: async ({
    api_key,
    api_port
  }: {
    api_key: string
    api_port: string | null
  }): Promise<DeepLUsage> => {
    const BASE_URL = `http://localhost:${api_port}`

    try {
      const response = await axios.get(`${BASE_URL}/api/v1/translation/usage`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-key-deepl': api_key
        }
      })
      return response.data
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        // Extracting error message from server response
        const errorMessage = e.response.data.detail || 'An error has occurred…'
        console.error("DeepLService.usage() : Axios Error -> " + e.response.data.detail)
        throw new Error(errorMessage)
      }
      console.error("DeepLService.usage() : An error has occurred…")
      throw new Error('An error has occurred…')
    }
  },

  translate: async ({
    api_key,
    api_port,
    text
  }: {
    api_key: string
    api_port: string | null
    text: string
    target_lang: string
  }): Promise<{
    translated_text: 'string'
  }> => {
    const BASE_URL = `http://localhost:${api_port}`
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/translation/translate`,
        {
          target_language: 'en-GB',
          text
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-key-deepl': api_key
          }
        }
      )
      return response.data
    } catch (e) {
      error(`DeepLService.translate() : An error has occurred… ${e}`)
      throw new Error(`An error has occurred… ${e}`)
    }
  }
}
