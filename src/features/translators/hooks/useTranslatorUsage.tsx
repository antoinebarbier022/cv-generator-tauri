import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { DeepLService } from '../deepl.service'

interface Props {
  api_key: string
}
export const useTranslatorUsage = ({ api_key }: Props) => {
  const usage = useQuery({
    queryKey: ['translators', 'deepl', 'usage'],
    queryFn: () => DeepLService.usage({ api_key }),
    retry: 0,
    enabled: !!api_key
  })

  const free_character_left_count = useMemo(() => {
    return (usage.data?.character_limit ?? 0) - (usage.data?.character_count ?? 0)
  }, [usage.data])

  const usageProgression = useMemo(() => {
    if (!usage.data || !usage.data?.character_limit) {
      return 0
    }

    return usage.data.character_count / usage.data.character_limit
  }, [usage.data, api_key])

  return {
    usageProgression,
    free_character_left_count,
    usage
  }
}
