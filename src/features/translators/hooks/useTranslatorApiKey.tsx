import { useMutation } from '@tanstack/react-query'
import { DeepLService } from '../deepl.service'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface State {
  apiKey: string
  setApiKey: (value: string) => void
}

const useApiKeyStore = create(
  persist<State>(
    (set) => ({
      apiKey: '',
      setApiKey: (value: string) => {
        set(() => ({ apiKey: value }))
      }
    }),
    {
      name: 'deepl-api-key',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export const useTranslatorApiKey = () => {
  const { apiKey, setApiKey } = useApiKeyStore()

  const mutation = useMutation({
    mutationKey: ['translators', 'deepl', 'usage'],
    mutationFn: DeepLService.usage
  })

  const handleSaveApiKey = async (value: string) => {
    mutation.mutate(
      { api_key: value },
      {
        onSuccess: () => {
          setApiKey(value)
          console.info(`User activated translation feature. API key validated successfully.`)
          //localStorage.setItem('deepl-api-key', value)
        },
        onError: () => {
          setApiKey('')
          console.error(`Translation feature activation failed. Invalid API key.`)
          //localStorage.setItem('deepl-api-key', '')
        }
      }
    )
  }

  const handleRemoveApiKey = () => {
    setApiKey('')
    localStorage.setItem('deepl-api-key', '')
    mutation.reset()
  }

  const displayAPIKey =
    apiKey.length > 8 ? `${apiKey.slice(0, 4)}****${apiKey.slice(-4)}` : '******'

  return { apiKey, displayAPIKey, mutation, handleSaveApiKey, handleRemoveApiKey }
}
