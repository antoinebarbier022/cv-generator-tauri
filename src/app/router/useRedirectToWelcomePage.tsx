import { useFormCV } from '@/shared/hooks/useFormCV'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useRedirectToWelcomePage = () => {
  const navigate = useNavigate()
  const { formValues } = useFormCV()
  useEffect(() => {
    if (formValues.firstname === '' && formValues.lastname === '') {
      navigate('/welcome', { replace: true })
    }
  }, [])
}
