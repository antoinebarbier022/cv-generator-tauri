import { create } from 'zustand'
import { useTranslatorApiKey } from './useTranslatorApiKey'

interface State {
  isActive: boolean
  setIsActive: (value: boolean) => void
}

const useTranslatorOptionStore = create<State>((set) => ({
  isActive: localStorage.getItem('option-translation') === 'true',
  setIsActive: (value: boolean) => {
    localStorage.setItem('option-translation', String(value))
    set(() => ({ isActive: value }))
  }
}))

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
