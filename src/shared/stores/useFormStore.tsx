import { StorageService } from '@/core/storage/services/StorageService'
import { UserData } from '@/core/storage/types/storage'
import { emptyInitialResume } from '@/shared/constants/empty-initial-resume'
import { finalFormValidationSchema } from '@/shared/validations/dataContentValidationSchema'
import deepEqual from 'deep-equal'
import { ValidationError } from 'yup'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FormState {
  lastUpdated: Date | null
  formWarnings: ValidationError | null
  formValues: UserData
  resetValues: () => void
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
      resetValues: () => {
        set(() => ({ formValues: emptyInitialResume }))
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
          //const hasChanged = !deepEqual(oldValues, newValues) // this code is wrong

          //console.warn("TODO : hasChanged doesn't work -> " + hasChanged)
          const saveValueInsideStorage = !isNewValuesEmpty && !isOldValuesEmpty
          const isFirstStorageEver = !isNewValuesEmpty && isOldValuesEmpty

          if (saveValueInsideStorage || isFirstStorageEver) {
            StorageService.setContentData({
              values: newValues
            })
            //console.info('Save form inside file storage')
            //console.trace({ newValues })
          }

          let formWarnings = null

          // check warnings
          finalFormValidationSchema
            .validate(newValues, {
              abortEarly: false
            })
            .then(() => {
              //console.debug(`Form contains 0 warning.`)
            })
            .catch((warnings: ValidationError) => {
              formWarnings = warnings
              //console.debug(`Form contains ${formWarnings.errors.length} warnings.`)
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
