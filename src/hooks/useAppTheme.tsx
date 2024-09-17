import { useFormStore } from '@/stores/useFormStore'
import capgeminiTheme from '@/themes/capgemini-theme.ts'
import themeFrog from '@/themes/default-theme.ts'
import luffyTheme from '@/themes/luffy-theme.ts'
import { useEffect, useMemo } from 'react'
import { create } from 'zustand'

export enum AppTheme {
  FROG = 'frog',
  CAPGEMINI = 'capgemini',
  LUFFY = 'one-piece',
  DEFAULT = 'frog'
}

interface State {
  appTheme: AppTheme
  setAppTheme: (value: AppTheme | string | null) => void
}

const normalizedAppTheme = (value: AppTheme | string | null) => {
  switch (value) {
    case AppTheme.FROG:
    case AppTheme.CAPGEMINI:
    case AppTheme.LUFFY:
      return value
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

  const { formValues } = useFormStore()

  const isLuffyTheme = useMemo(
    () =>
      formValues.employment_history.findIndex(
        (el) =>
          el.content.en.toLocaleLowerCase() === 'pirate' ||
          el.content.fr.toLocaleLowerCase() === 'pirate'
      ) !== -1,
    [formValues.employment_history]
  )

  useEffect(() => {
    if (!isLuffyTheme && appTheme === AppTheme.LUFFY) {
      setAppTheme(AppTheme.DEFAULT)
    }
  }, [])

  const allTheme: { value: AppTheme; label: string; hide?: boolean }[] = useMemo(
    () => [
      {
        value: AppTheme.FROG,
        label: 'frog'
      },
      {
        value: AppTheme.CAPGEMINI,
        label: 'Capgemini'
      },

      {
        value: AppTheme.LUFFY,
        label: 'One Piece',
        hide: !isLuffyTheme
      }
    ],
    [isLuffyTheme]
  )

  const appThemeConfig = useMemo(() => {
    switch (appTheme) {
      case AppTheme.FROG:
        return themeFrog
      case AppTheme.CAPGEMINI:
        return capgeminiTheme
      case AppTheme.LUFFY:
        return luffyTheme
      default:
        return themeFrog
    }
  }, [appTheme])

  return {
    appTheme,
    setAppTheme,
    appThemeConfig,
    allTheme
  }
}
