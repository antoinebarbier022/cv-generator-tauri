import { useFormStore } from '@/stores/useFormStore'
import { finalFormValidationSchema } from '@/validations/dataContentValidationSchema'
import { useEffect, useState } from 'react'
import { ValidationError } from 'yup'

export const useFormWarnings = () => {
  const { formValues } = useFormStore()
  const [countWarnings, setCountWarnings] = useState<number | null>(null)

  useEffect(() => {
    const validateForm = async () => {
      try {
        await finalFormValidationSchema.validate(formValues, {
          abortEarly: false
        })
        setCountWarnings(0)
      } catch (error) {
        if (error instanceof ValidationError) {
          setCountWarnings(error.inner.length)
        }
      }
    }

    validateForm()
  }, [formValues])

  return { countWarnings }
}
