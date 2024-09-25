import { MenuEvent } from '@/generated/events/menu-events'
import { emit } from '@tauri-apps/api/event'
import { useEffect } from 'react'
import { useUpdaterStore } from '../stores/updater.store'
import { AppUpdaterStatus } from '../types/updater.types'
import { useAppUpdater } from './useAppUpdater'

export const useUpdaterOnFirstLaunch = () => {
  const { checkForUpdates } = useAppUpdater()
  const { alreadyAutoCheck, setAlreadyAutoCheck, setStatus } = useUpdaterStore()

  useEffect(() => {
    const firstCheckOnLaunch = async () => {
      const update = await checkForUpdates()
      if (update && update.available) {
        setStatus(AppUpdaterStatus.UPDATE_AVAILABLE)
        emit(MenuEvent.AppCheckUpdate)
        setAlreadyAutoCheck(true)
      }
    }
    if (!alreadyAutoCheck) firstCheckOnLaunch()
  }, [])
}
