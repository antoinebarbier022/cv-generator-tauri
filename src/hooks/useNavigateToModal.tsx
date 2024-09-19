import { useSearchParams } from 'react-router-dom'

export const useNavigateToModal = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const open = (value: string) => {
    value ? searchParams.set('modal', encodeURIComponent(value)) : searchParams.delete('modal')
    setSearchParams(searchParams)
  }

  const close = () => {
    searchParams.delete('modal')
    setSearchParams(searchParams)
  }

  const isOpen = (value: string | string[]) => {
    const urlValue = searchParams.get('modal')
    return Array.isArray(value) && urlValue
      ? value.includes(urlValue)
      : urlValue === encodeURIComponent(value as string)
  }

  return { close, open, isOpen }
}
