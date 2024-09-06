import { useFormCV } from '@/hooks/useFormCV'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from '@tauri-apps/api/dialog'
import { removeFile } from '@tauri-apps/api/fs'

export const useDeleteImageProfileStorage = () => {
  const { formValues } = useFormCV()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete_image_profile'],
    mutationFn: async () => {
      await removeFile(formValues.picture)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['image_profile'] })
      await queryClient.invalidateQueries({ queryKey: ['data'] })
    },
    onError: async (error) => {
      await message(error.message, { title: error.name, type: 'error' })
    }
  })
}
