import { useNavigate, useSearchParams } from 'react-router-dom'

export const useNavigateToModal = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const open = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('modal', encodeURIComponent(value))

    // Don't use setSearchParams to open the modal
    navigate(`${location.pathname}?${newSearchParams}`)
    console.info(`Opened modal "${value}"`)
  }

  const close = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    const idModal = newSearchParams.get('modal')
    console.info(`Closed modal "${idModal}"`)
    newSearchParams.delete('modal')
    navigate(`${location.pathname}?${newSearchParams}`)
  }

  const isOpen = (value: string | string[]) => {
    const urlValue = searchParams.get('modal')
    return Array.isArray(value) && urlValue
      ? value.includes(urlValue)
      : urlValue === encodeURIComponent(value as string)
  }

  return { close, open, isOpen }
}
