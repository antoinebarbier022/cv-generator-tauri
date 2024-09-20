import { StorageService } from '@/core/storage/services/StorageService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from '@tauri-apps/plugin-dialog'

export const useSetImageProfileStorage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['set_image_profile'],
    mutationFn: StorageService.setImageProfile,
    onSuccess: async (data) => {
      if (data !== null) {
        await queryClient.invalidateQueries({ queryKey: ['image_profile'] })
        //await queryClient.invalidateQueries({ queryKey: ["data"] });
      }
    },
    onError: async (error) => {
      await message(error.message, { title: error.name, kind: 'error' })
    }
  })
}
