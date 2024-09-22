import { ErrorContent } from '@/generated/errors/types/errors'
import { emit } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/core'
import { useEffect } from 'react'

export const useBackendError = () => {
  useEffect(() => {
    invoke('get_backend_error').then((error) => {
      if (error as string | null) {
        emit('error', {
          title: 'Backend Error',
          message: error
        } as ErrorContent)
      }
    })
  }, [])
}
