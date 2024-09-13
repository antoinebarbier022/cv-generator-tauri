import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useTranslatorApiKey } from './useTranslatorApiKey'

interface State {
  isActive: boolean
  setIsActive: (value: boolean) => void
}

const useTranslatorOptionStore = create(
  persist<State>(
    (set) => ({
      isActive: false,
      setIsActive: (value: boolean) => {
        set(() => ({ isActive: value }))
      }
    }),
    {
      name: 'option-translation',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export const useTranslatorOption = () => {
  const { apiKey } = useTranslatorApiKey()
  const { isActive, setIsActive } = useTranslatorOptionStore()

  const isActiveOptionValid = apiKey !== '' && isActive

  return {
    isActiveOption: isActive,
    setOptionActivation: setIsActive,
    isActiveOptionValid
  }
}
