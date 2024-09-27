import { useEffect } from 'react'

import { emitApplicationEvents } from '@/core/events/emit-application-events'
import { useUpdateSettingsStore } from '../stores/useUpdateSettingsStore'

export const useUpdaterOnFirstLaunch = () => {
  const { alreadyAutoCheck, setAlreadyAutoCheck } = useUpdateSettingsStore()

  useEffect(() => {
    if (!alreadyAutoCheck) {
      emitApplicationEvents.checkForUpdates({
        open_modal_after_check: true,
        open_modal_before_check: false
      })
      setAlreadyAutoCheck(true)
    }
  }, [])
}
