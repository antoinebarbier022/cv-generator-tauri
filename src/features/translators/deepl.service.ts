import { invoke } from '@tauri-apps/api/core'
import axios from 'axios'
import { DeepLUsage } from './deepl.types'

export const DeepLService = {
  usage: async ({ api_key }: { api_key: string }): Promise<DeepLUsage> => {
    const api_port = await invoke<string>('get_backend_port')
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

        throw new Error(errorMessage)
      }

      throw new Error('An error has occurred…')
    }
  },

  translate: async ({
    api_key,
    text
  }: {
    api_key: string
    text: string
    target_lang: string
  }): Promise<{
    translated_text: 'string'
  }> => {
    const api_port = await invoke<string>('get_backend_port')
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
      throw new Error(`DeepLService.translate(): An error has occurred… ${e}`)
    }
  }
}
