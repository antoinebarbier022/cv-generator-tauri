import { emptyInitialResume } from '@/constants/empty-initial-resume'
import { StorageService } from '@/services/StorageService'
import { UserData } from '@/types/storage'
import deepEqual from 'deep-equal'
import { create } from 'zustand'

interface FormState {
  lastUpdated: Date | null
  formValues: UserData
  setLastUpdated: (value: Date) => void
  setFormValues: (values: Partial<UserData>) => void
}

export const useFormStore = create<FormState>((set) => ({
  lastUpdated: null,
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
      const hasChanged = !deepEqual(oldValues, newValues)

      const saveValueInsideStorage = hasChanged && !isNewValuesEmpty && !isOldValuesEmpty
      if (saveValueInsideStorage) {
        StorageService.setContentData({
          values: newValues
        })
        console.log('[INFO] : change form value', { values })
      }
      return {
        lastUpdated: saveValueInsideStorage ? new Date() : state.lastUpdated,
        formValues: newValues
      }
    })
  }
}))
