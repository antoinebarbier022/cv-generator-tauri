import { useMutation } from '@tanstack/react-query'
import { DeepLService } from '../deepl.service'

import { create } from 'zustand'

interface State {
  apiKey: string
  setApiKey: (value: string) => void
}

const useApiKeyStore = create<State>((set) => ({
  apiKey: localStorage.getItem('deepl-api-key') ?? '',
  setApiKey: (value: string) => {
    localStorage.setItem('deepl-api-key', value)
    set(() => ({ apiKey: value }))
  }
}))

export const useTranslatorApiKey = () => {
  const { apiKey, setApiKey } = useApiKeyStore()

  const mutation = useMutation({
    mutationKey: ['translators', 'deepl', 'usage'],
    mutationFn: DeepLService.usage
  })

  const handleSaveApiKey = async (value: string) => {
    mutation.mutate(value, {
      onSuccess: () => {
        setApiKey(value)
        localStorage.setItem('deepl-api-key', value)
      },
      onError: () => {
        setApiKey('')
        localStorage.setItem('deepl-api-key', '')
      }
    })
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
