import { StorageService } from '@/services/StorageService'
import { useQuery } from '@tanstack/react-query'

export const useGetDataStorage = () => {
  return useQuery({
    queryKey: ['data'],
    queryFn: StorageService.getContentData
  })
}
