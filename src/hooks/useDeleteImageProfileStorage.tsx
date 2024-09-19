import { useFormCV } from '@/hooks/useFormCV'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from '@tauri-apps/plugin-dialog'
import { remove } from '@tauri-apps/plugin-fs'

export const useDeleteImageProfileStorage = () => {
  const { formValues } = useFormCV()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete_image_profile'],
    mutationFn: async () => {
      await remove(formValues.picture)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['image_profile'] })
      await queryClient.invalidateQueries({ queryKey: ['data'] })
      console.debug(`Image profile is deleted.`)
    },
    onError: async (error) => {
      console.error(`An error occurred on delete image profile...`)
      await message(error.message, { title: error.name, kind: 'error' })
    }
  })
}
