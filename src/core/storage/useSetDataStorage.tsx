import { StorageService } from '@/core/storage/services/StorageService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from '@tauri-apps/plugin-dialog'

export const useSetDataStorage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['setData'],
    mutationFn: StorageService.setContentData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] })
      queryClient.invalidateQueries({ queryKey: ['lastModifiedAt'] })
    },
    onError: async (error) => {
      await message(error.message, { title: error.name, kind: 'error' })
    }
  })
}
