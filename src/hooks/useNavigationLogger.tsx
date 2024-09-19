import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useNavigationLogger = () => {
  const location = useLocation()

  useEffect(() => {
    // Log chaque fois que la route change
    console.info(`Navigated to "${location.pathname}"`)
  }, [location.pathname]) // On observe location.pathname pour déclencher le log à chaque changement

  return null // Ce composant ne rend rien mais loggue la navigation
}
