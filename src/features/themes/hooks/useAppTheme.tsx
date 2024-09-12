import themeCapgemini from '@/themes/capgemini-theme.ts'
import themeFrog from '@/themes/default-theme.ts'
import { useMemo } from 'react'
import { create } from 'zustand'

export enum AppTheme {
  FROG = 'frog',
  CAPGEMINI = 'capgemini',
  DEFAULT = 'default'
}

interface State {
  appTheme: AppTheme
  setAppTheme: (value: AppTheme | string | null) => void
}

const normalizedAppTheme = (value: AppTheme | string | null) => {
  switch (value) {
    case 'frog':
      return AppTheme.FROG
    case 'capgemini':
      return AppTheme.CAPGEMINI
    default:
      return AppTheme.DEFAULT
  }
}

const useAppThemeStore = create<State>((set) => ({
  appTheme: normalizedAppTheme(localStorage.getItem('app-theme')),
  setAppTheme: (value: AppTheme | string | null) => {
    localStorage.setItem('app-theme', normalizedAppTheme(value))
    set(() => ({ appTheme: normalizedAppTheme(value) }))
  }
}))

export const useAppTheme = () => {
  const { appTheme, setAppTheme } = useAppThemeStore()

  const appThemeConfig = useMemo(() => {
    switch (appTheme) {
      case 'frog':
        return themeFrog
      case 'capgemini':
        return themeCapgemini
      default:
        return themeFrog
    }
  }, [appTheme])

  return {
    appTheme,
    setAppTheme,
    appThemeConfig
  }
}
