import capgeminiTheme from '@/themes/capgemini-theme.ts'
import themeFrog from '@/themes/default-theme.ts'
import luffyTheme from '@/themes/luffy-theme.ts'
import { useMemo } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export enum AppTheme {
  FROG = 'frog',
  CAPGEMINI = 'capgemini',
  ONE_PIECE = 'one-piece',
  DEFAULT = 'frog'
}

const normalizedAppTheme = (value: AppTheme | string | null) => {
  switch (value) {
    case AppTheme.FROG:
    case AppTheme.CAPGEMINI:
    case AppTheme.ONE_PIECE:
      return value
    default:
      return AppTheme.DEFAULT
  }
}

interface State {
  appTheme: AppTheme
  setAppTheme: (value: AppTheme | string | null) => void
  overrideAppTheme: AppTheme | null
  setOverrideAppTheme: (value: AppTheme | string | null) => void
}

const useAppThemeStore = create(
  persist<State>(
    (set) => ({
      appTheme: AppTheme.DEFAULT,
      setAppTheme: (value: AppTheme | string | null) => {
        set(() => ({ appTheme: normalizedAppTheme(value) }))
      },
      overrideAppTheme: null,
      setOverrideAppTheme: (value: AppTheme | string | null) => {
        set(() => ({ overrideAppTheme: value ? normalizedAppTheme(value) : null }))
      }
    }),
    {
      name: 'app-theme',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export const useAppTheme = () => {
  const { appTheme, overrideAppTheme, setOverrideAppTheme, setAppTheme } = useAppThemeStore()

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
        value: AppTheme.ONE_PIECE,
        label: 'One Piece',
        hide: !Boolean(overrideAppTheme)
      }
    ],
    [overrideAppTheme]
  )

  const appThemeConfig = useMemo(() => {
    switch (overrideAppTheme || appTheme) {
      case AppTheme.FROG:
        return themeFrog
      case AppTheme.CAPGEMINI:
        return capgeminiTheme
      case AppTheme.ONE_PIECE:
        return luffyTheme
      default:
        return themeFrog
    }
  }, [appTheme, overrideAppTheme])

  return {
    appTheme,
    setAppTheme,
    appThemeConfig,
    allTheme,
    overrideAppTheme,
    setOverrideAppTheme
  }
}
