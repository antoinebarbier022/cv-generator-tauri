import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormCV } from './useFormCV'

export const useRedirectToWelcomePage = () => {
  const navigate = useNavigate()
  const { formValues } = useFormCV()
  useEffect(() => {
    if (formValues.firstname === '' && formValues.lastname === '') {
      console.debug("Navigate to '/welcome' page.")
      navigate('/welcome', { replace: true })
    }
  }, [])
}
