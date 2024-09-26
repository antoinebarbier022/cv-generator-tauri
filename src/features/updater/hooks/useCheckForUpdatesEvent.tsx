import { useNavigateToModal } from '@/app/router/useNavigateToModal'
import { MenuEvent } from '@/generated/events/menu-events'
import { listen } from '@tauri-apps/api/event'
import { useEffect, useRef } from 'react'
import { AppUpdaterStatus, UpdaterEventPayload } from '../types/updater.types'
import { useUpdater } from './useUpdater'

export const useCheckForUpdatesEvent = () => {
  const { status, checkForUpdates } = useUpdater()
  const modal = useNavigateToModal()

  const statusRef = useRef(status)

  useEffect(() => {
    statusRef.current = status
  }, [status])

  useEffect(() => {
    const unlisten = listen<UpdaterEventPayload>(MenuEvent.AppCheckUpdate, async (event) => {
      if (event.payload.openModalBeforeCheck) {
        modal.open('updater')
      }
      if (
        statusRef.current !== AppUpdaterStatus.INSTALLING_UPDATE &&
        statusRef.current !== AppUpdaterStatus.UPDATE_DOWNLOADED &&
        statusRef.current !== AppUpdaterStatus.DOWNLOADING_UPDATE &&
        statusRef.current !== AppUpdaterStatus.CHECK_ERROR &&
        statusRef.current !== AppUpdaterStatus.DOWNLOAD_FAILED
      ) {
        checkForUpdates().finally(() => {
          if (event.payload.openModalAfterCheck) {
            modal.open('updater')
          }
        })
      }
    })

    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [])
}
