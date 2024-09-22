import { StorageService } from '@/core/storage/services/StorageService'
import { useFormCV } from '@/shared/hooks/useFormCV'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from '@tauri-apps/plugin-dialog'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useImportDataContent = () => {
  const { setFormValues } = useFormCV()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ['import-data-content'],
    mutationFn: StorageService.importContentData,
    onSuccess: async (data) => {
      if (data !== null) {
        setFormValues({
          picture: ''
        })
        await queryClient.invalidateQueries({ queryKey: ['image_profile'] })
        await queryClient.invalidateQueries({ queryKey: ['data'] })
        toast.success('JSON is imported')
        console.error(`New JSON is imported.`)
        navigate('/', { replace: true })
      }
    },
    onError: async (error) => {
      console.error(`An error occurred on import data content... ${error}`)
      await message(error.message, { title: error.name, kind: 'error' })
    }
  })
}
