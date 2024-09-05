import { useMutation } from '@tanstack/react-query'
import { CVGenerationService } from '../services/cv-generation.service'

export const useAskOutputPath = () => {
  return useMutation({
    mutationKey: ['askOutputPath'],
    mutationFn: CVGenerationService.askOutputPath,
    onError: (e) => {
      alert(`Ask Output Path [error] : ${e}`)
    }
  })
}
