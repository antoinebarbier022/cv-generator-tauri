import { StorageService } from '@/services/StorageService'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useRedirectToWelcomePage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const result = await StorageService.getContentData() // Supposons que `data` soit une promesse ou que tu attendes un appel asynchrone pour obtenir `data`

      if (result?.firstname === '' && result?.lastname === '') {
        navigate('/welcome')
      }
    }

    fetchData()
  }, [])
}
