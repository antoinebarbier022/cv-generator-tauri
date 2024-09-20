import { useSearchParams } from 'react-router-dom'

export const useNavigateToModal = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const open = (value: string) => {
    searchParams.set('modal', encodeURIComponent(value))
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('modal', encodeURIComponent(value))
    setSearchParams(newSearchParams)
    console.info(`Opened modal "${value}"`)
    console.log(newSearchParams.toString())
  }

  const close = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('modal')
    setSearchParams(newSearchParams)
    console.info(`Closed modal "${searchParams.get('modal')}"`)
    console.log(newSearchParams.toString())
  }

  const isOpen = (value: string | string[]) => {
    const urlValue = searchParams.get('modal')
    return Array.isArray(value) && urlValue
      ? value.includes(urlValue)
      : urlValue === encodeURIComponent(value as string)
  }

  return { close, open, isOpen }
}
