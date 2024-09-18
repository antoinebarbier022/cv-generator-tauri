import { emptyInitialResume } from '@/constants/empty-initial-resume'
import { StorageService } from '@/services/StorageService'
import { UserData } from '@/types/storage'
import { finalFormValidationSchema } from '@/validations/dataContentValidationSchema'
import deepEqual from 'deep-equal'
import { ValidationError } from 'yup'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FormState {
  lastUpdated: Date | null
  formWarnings: ValidationError | null
  formValues: UserData
  setLastUpdated: (value: Date | null) => void
  setFormValues: (values: Partial<UserData>) => void
}

export const useFormStore = create(
  persist<FormState>(
    (set) => ({
      lastUpdated: null,
      formWarnings: null,
      formValues: emptyInitialResume,
      setLastUpdated: (value) => {
        set(() => ({
          lastUpdated: value
        }))
      },
      setFormValues: (values) => {
        set((state) => {
          const oldValues = state.formValues
          const newValues = {
            ...oldValues,
            ...values
          } as UserData

          const isOldValuesEmpty = deepEqual(oldValues, emptyInitialResume)
          const isNewValuesEmpty = deepEqual(newValues, emptyInitialResume)
          const hasChanged = !deepEqual(oldValues, newValues) // this code is wrong
          console.log({ oldValues })
          console.log({ newValues })
          console.log(hasChanged)
          const saveValueInsideStorage = !isNewValuesEmpty && !isOldValuesEmpty
          console.log({ saveValueInsideStorage })
          if (saveValueInsideStorage) {
            StorageService.setContentData({
              values: newValues
            })
            console.log('[INFO] : change form value', { values })
          }

          let formWarnings = null

          // check warnings
          finalFormValidationSchema
            .validate(newValues, {
              abortEarly: false
            })
            .then(() => {
              console.log("Pas d'erreurs")
            })
            .catch((warnings: ValidationError) => {
              formWarnings = warnings
            })

          return {
            lastUpdated: saveValueInsideStorage ? new Date() : state.lastUpdated,
            formValues: newValues,
            formWarnings: formWarnings
          }
        })
      }
    }),
    {
      name: 'form-data-cv',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
