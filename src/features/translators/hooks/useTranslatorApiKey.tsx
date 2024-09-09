import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { DeepLService } from '../deepl.service'

export const useTranslatorApiKey = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('deepl-api-key') ?? '')

  const mutation = useMutation({
    mutationKey: ['translators', 'deepl', 'usage'],
    mutationFn: DeepLService.usage
  })

  const handleSaveApiKey = async (value: string) => {
    mutation.mutate(value, {
      onSuccess: () => {
        setApiKey(value)
        localStorage.setItem('deepl-api-key', value)
      }
    })
  }

  const handleRemoveApiKey = () => {
    setApiKey('')
    window.sessionStorage.setItem('deepl-api-key', '')
    mutation.reset()
  }

  const displayAPIKey =
    apiKey.length > 8 ? `${apiKey.slice(0, 4)}****${apiKey.slice(-4)}` : '******'

  return { apiKey, displayAPIKey, mutation, handleSaveApiKey, handleRemoveApiKey }
}
