import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useNavigationLogger = () => {
  const location = useLocation()

  useEffect(() => {
    console.info(`Navigated to "${location.pathname}"`)
  }, [location.pathname])

  return null
}
