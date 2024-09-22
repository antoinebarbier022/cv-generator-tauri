import { MenuEvent } from '@/generated/events/menu-events'
import { emit } from '@tauri-apps/api/event'
import { useEffect } from 'react'
import { useUpdaterStore } from '../stores/updater.store'
import { AppUpdaterStatus } from '../types/updater.types'
import { useAppUpdater } from './useAppUpdater'

export const useAutoDetectUpdater = () => {
  const { checkForUpdates } = useAppUpdater()
  const { alreadyAutoDetect, setAlreadyAutoDetect, setStatus } = useUpdaterStore()

  useEffect(() => {
    const check = async () => {
      const update = await checkForUpdates()
      if (update && update.available) {
        setStatus(AppUpdaterStatus.UPDATE_AVAILABLE)
        emit(MenuEvent.AppCheckUpdate)
        setAlreadyAutoDetect(true)
      }
    }
    if (!alreadyAutoDetect) check()
  }, [])
}
