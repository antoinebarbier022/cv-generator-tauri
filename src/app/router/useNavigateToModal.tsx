import { useNavigate, useSearchParams } from 'react-router-dom'

export const useNavigateToModal = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const open = (value: string) => {
    searchParams.set('modal', encodeURIComponent(value))
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('modal', encodeURIComponent(value))

    // Don't use setSearchParams to open the modal
    navigate(`${location.pathname}?${newSearchParams}`)
    console.info(`Opened modal "${value}"`)
  }

  const close = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('modal')
    setSearchParams(newSearchParams)
    console.info(`Closed modal "${searchParams.get('modal')}"`)
  }

  const isOpen = (value: string | string[]) => {
    const urlValue = searchParams.get('modal')
    return Array.isArray(value) && urlValue
      ? value.includes(urlValue)
      : urlValue === encodeURIComponent(value as string)
  }

  return { close, open, isOpen }
}
