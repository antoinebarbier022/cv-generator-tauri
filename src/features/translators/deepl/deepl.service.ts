import axios from 'axios'
import { DeepLUsage } from './deepl.types'

const BASE_URL = 'http://localhost:8008'

export const DeepLService = {
  usage: async (api_key: string): Promise<DeepLUsage> => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/translation/usage`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-key-deepl': api_key
        }
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Extracting error message from server response
        const errorMessage = error.response.data.detail || 'Une erreur est survenue...'
        console.log(error.response.data.detail)
        throw new Error(errorMessage)
      }
      throw new Error('Une erreur est survenue...')
    }
  },

  translate: async (api_key: string): Promise<DeepLUsage> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/translation/translate`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-key-deepl': api_key
          }
        }
      )
      return response.data
    } catch (error) {
      throw new Error(`Une erreur est survenue... ${error}`)
    }
  }
}
