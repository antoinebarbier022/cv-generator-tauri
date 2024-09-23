import { useNavigateToModal } from '@/app/router/useNavigateToModal'
import { getVersion } from '@tauri-apps/api/app'
import { relaunch } from '@tauri-apps/plugin-process'
import { check, Update } from '@tauri-apps/plugin-updater'
import { useCallback, useEffect, useState } from 'react'
import { useUpdaterStore } from '../stores/updater.store'
import { AppUpdaterStatus } from '../types/updater.types'

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const useAppUpdater = (): {
  status: AppUpdaterStatus
  update: Pick<Update, 'available' | 'version' | 'body' | 'currentVersion' | 'date'> | null
  currentVersion: string | null
  downloadedLength: number | null
  totalUpdateLength: number | null
  checkForUpdates: () => Promise<Update | null>
  relaunch: () => void
  cancelUpdater: () => void
  downloadAndInstall: () => void
} => {
  const {
    status,
    setStatus,
    update,
    setUpdate,
    downloadedLength,
    setDownloadedLength,
    totalUpdateLength,
    setUpdateLength
  } = useUpdaterStore()

  const [currentVersion, setCurrentVersion] = useState<string | null>(null)
  const { close: closeModal } = useNavigateToModal()

  const { open: openModal } = useNavigateToModal()

  const resetUpdater = useCallback(() => {
    setUpdate(null)
    setDownloadedLength(null)
    setUpdateLength(null)
  }, [])

  const cancelUpdater = useCallback(() => {
    closeModal()
    resetUpdater()
    setStatus(AppUpdaterStatus.IDLE)
    console.info(`[Updater] Cancel`)
  }, [])

  const relaunchApp = async () => {
    console.info(`[Updater] Relaunch application CV Generator.`)
    setStatus(AppUpdaterStatus.UPDATE_SUCCESS)
    await relaunch()
  }

  const downloadAndInstall = async () => {
    setStatus(AppUpdaterStatus.DOWNLOADING_UPDATE)
    if (!update || !update.available) {
      return
    }

    let downloaded = 0
    let contentLength = 0
    setDownloadedLength(0)
    setUpdateLength(0)
    try {
      await update.downloadAndInstall(
        (event) => {
          switch (event.event) {
            case 'Started':
              contentLength = event.data.contentLength ?? 0
              setUpdateLength(contentLength)
              console.info(`[Updater] started downloading ${event.data.contentLength} bytes`)
              setStatus(AppUpdaterStatus.DOWNLOADING_UPDATE)
              break
            case 'Progress':
              downloaded += event.data.chunkLength
              setDownloadedLength(downloaded)
              console.trace(`[Updater] ⬇ downloaded ${downloaded} from ${contentLength}`)
              break
            case 'Finished':
              console.info('[Updater] download finished')
              setStatus(AppUpdaterStatus.UPDATE_DOWNLOADED)
              openModal('updater')
              break
          }
        },
        {
          timeout: 300000 // 5min
        }
      )
    } catch (e) {
      setStatus(AppUpdaterStatus.DOWNLOAD_FAILED)
      openModal('updater')
      console.error(`[Updater] ${e}`)
    }
  }

  const checkForUpdates = async () => {
    try {
      resetUpdater()
      setStatus(AppUpdaterStatus.CHECKING_FOR_UPDATES)
      const update = await check({ timeout: 10000 })
      await sleep(500)
      setUpdate(update)

      if (!update) {
        setStatus(AppUpdaterStatus.NO_UPDATE_AVAILABLE)
        const version = await getVersion()
        setCurrentVersion(version)
      } else {
        setCurrentVersion(update.currentVersion)
        setStatus(AppUpdaterStatus.UPDATE_AVAILABLE)
        console.info(`[Updater] Found available update ${update.version} from ${update.date}`)
      }
      return update
    } catch (error) {
      setStatus(AppUpdaterStatus.CHECK_ERROR)
      console.error(error)
      return null
    }
  }

  useEffect(() => {
    if (status === AppUpdaterStatus.CHECKING_FOR_UPDATES) {
      checkForUpdates()
    }
  }, [status])

  return {
    status,
    update: update
      ? {
          ...update
        }
      : null,
    currentVersion,
    downloadedLength,
    totalUpdateLength,
    checkForUpdates,
    downloadAndInstall,
    cancelUpdater,
    relaunch: relaunchApp
  }
}
