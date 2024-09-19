import { StorageService } from '@/services/StorageService'
import { useFormStore } from '@/stores/useFormStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from '@tauri-apps/plugin-dialog'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const useResetDataStorage = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { resetValues } = useFormStore()
  return useMutation({
    mutationKey: ['resetData'],
    mutationFn: StorageService.resetContentData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] })
      console.info(t('toast-success.reset-data'))
      navigate('/welcome', { replace: true })
      resetValues()
    },
    onError: async (error) => {
      await message(error.message, { title: error.name, kind: 'error' })
    }
  })
}
