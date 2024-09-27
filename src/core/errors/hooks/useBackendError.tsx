import { emitApplicationEvents } from '@/core/events/emit-application-events'
import { invoke } from '@tauri-apps/api/core'
import { useEffect } from 'react'

export const useBackendError = () => {
  useEffect(() => {
    invoke('get_backend_error').then((error) => {
      if (error as string | null) {
        emitApplicationEvents.errorToBackend({
          title: 'Backend Error',
          message: error as string | null
        })
      }
    })
  }, [])
}
