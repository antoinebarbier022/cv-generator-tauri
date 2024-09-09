import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { DeepLService } from '../deepl.service'

interface Props {
  apiKey: string
}
export const useTranslatorUsage = ({ apiKey }: Props) => {
  const usage = useQuery({
    queryKey: ['translators', 'deepl', 'usage'],
    queryFn: () => DeepLService.usage(apiKey),
    retry: 0,
    enabled: !!apiKey
  })

  const free_character_left_count = useMemo(() => {
    return (usage.data?.character_limit ?? 0) - (usage.data?.character_count ?? 0)
  }, [usage.data])

  const usageProgression = useMemo(() => {
    if (!usage.data || !usage.data?.character_limit) {
      return 0
    }

    return usage.data.character_count / usage.data.character_limit
  }, [usage.data, apiKey])

  return {
    usageProgression,
    free_character_left_count,
    usage
  }
}
