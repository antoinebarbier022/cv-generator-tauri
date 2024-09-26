import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UpdateSettingsState {
  autoCheckActive: boolean
  alreadyAutoCheck: boolean
  lastCheck: Date | null
  setAutoCheckActive: (value: boolean) => void
  setLastCheck: (value: Date) => void
  setAlreadyAutoCheck: (value: boolean) => void
}

export const useUpdateSettingsStore = create(
  persist<UpdateSettingsState>(
    (set) => ({
      autoCheckActive: true,
      alreadyAutoCheck: false,
      lastCheck: null,
      setAutoCheckActive: (value: boolean) => {
        set(() => ({ autoCheckActive: value }))
      },
      setLastCheck: (value: Date) => {
        set(() => ({ lastCheck: value }))
      },
      setAlreadyAutoCheck: (value: boolean) => {
        set(() => ({ alreadyAutoCheck: value }))
      }
    }),
    {
      name: 'update-settings',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
