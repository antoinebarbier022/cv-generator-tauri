import { StorageService } from '@/core/storage/services/StorageService'
import { useQuery } from '@tanstack/react-query'

export const useGetDataStorage = () => {
  return useQuery({
    queryKey: ['data'],
    queryFn: StorageService.getContentData
  })
}
