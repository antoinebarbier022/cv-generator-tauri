import { MenuEvent } from '@/generated/events/menu-events'
import { emit } from '@tauri-apps/api/event'
import { useEffect } from 'react'

import { useUpdateSettingsStore } from '../stores/useUpdateSettingsStore'

export const useUpdaterOnFirstLaunch = () => {
  const { alreadyAutoCheck, setAlreadyAutoCheck } = useUpdateSettingsStore()

  useEffect(() => {
    if (!alreadyAutoCheck) {
      emit(MenuEvent.AppCheckUpdate, {
        payload: {
          openModal: true
        }
      })
      setAlreadyAutoCheck(true)
    }
  }, [])
}
