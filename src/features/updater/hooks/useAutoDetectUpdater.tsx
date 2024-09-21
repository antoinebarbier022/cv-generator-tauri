import { MenuEvent } from '@/generated/events/menu-events'
import { emit } from '@tauri-apps/api/event'
import { useEffect } from 'react'
import { useUpdaterStore } from '../stores/updater.store'

export const useAutoDetectUpdater = () => {
  const { alreadyAutoDetect, setAlreadyAutoDetect } = useUpdaterStore()
  useEffect(() => {
    if (!alreadyAutoDetect) {
      emit(MenuEvent.AppCheckUpdate)
      setAlreadyAutoDetect(true)
    }
  }, [])
}
