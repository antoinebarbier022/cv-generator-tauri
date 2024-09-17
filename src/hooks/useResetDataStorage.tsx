import { StorageService } from '@/services/StorageService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from '@tauri-apps/api/dialog'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const useResetDataStorage = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ['resetData'],
    mutationFn: StorageService.resetContentData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] })
      console.log(t('toast-success.reset-data'))
      navigate('/welcome')
    },
    onError: async (error) => {
      await message(error.message, { title: error.name, type: 'error' })
    }
  })
}
