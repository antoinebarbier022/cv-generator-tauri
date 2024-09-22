import { ErrorContent } from '@/generated/errors/types/errors'
import { Event, listen } from '@tauri-apps/api/event'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ErrorToast } from '../components/error-toast.tsx'
import { useBackendError } from './useBackendError.tsx'

export const useErrors = () => {
  useBackendError()

  useEffect(() => {
    const unlisten = listen('error', (event: Event<ErrorContent>) => {
      toast.error(<ErrorToast error={event.payload} />)
    })

    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [])
}
