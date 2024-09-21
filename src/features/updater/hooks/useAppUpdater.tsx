import { useNavigateToModal } from '@/app/router/useNavigateToModal'
import { relaunch } from '@tauri-apps/plugin-process'
import { check, Update } from '@tauri-apps/plugin-updater'
import { useCallback, useEffect } from 'react'
import { useUpdaterStore } from '../stores/updater.store'
import { AppUpdaterStatus } from '../types/updater.types'

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const useAppUpdater = (): {
  status: AppUpdaterStatus
  update: Pick<Update, 'available' | 'version' | 'body' | 'currentVersion' | 'date'> | null
  downloadedLength: number | null
  totalUpdateLength: number | null
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

  const { open: openModal } = useNavigateToModal()

  const resetUpdater = useCallback(() => {
    setUpdate(null)
    setDownloadedLength(null)
    setUpdateLength(null)
  }, [])

  const cancelUpdater = useCallback(() => {
    resetUpdater()
    setStatus(AppUpdaterStatus.IDLE)
    console.info(`[Updater] Cancel`)
  }, [])

  const relaunchApp = async () => {
    console.info(`[Updater] Relaunch application CV Generator.`)
    await relaunch()
  }

  const downloadAndInstall = async () => {
    setStatus(AppUpdaterStatus.DOWNLOADING_UPDATE)
    if (!update || !update.available) {
      return
    }

    let downloaded = 0
    let contentLenght = 0
    setDownloadedLength(0)
    setUpdateLength(0)
    try {
      await update.downloadAndInstall((event) => {
        switch (event.event) {
          case 'Started':
            contentLenght = event.data.contentLength ?? 0
            setUpdateLength(contentLenght)
            console.info(`[Updater] started downloading ${event.data.contentLength} bytes`)
            setStatus(AppUpdaterStatus.UPDATE_AVAILABLE)
            break
          case 'Progress':
            setStatus(AppUpdaterStatus.DOWNLOADING_UPDATE)
            downloaded += event.data.chunkLength
            setDownloadedLength(downloaded)
            console.trace(`[Updater] ⬇ downloaded ${downloaded} from ${contentLenght}`)

            break
          case 'Finished':
            console.info('[Updater] download finished')
            setStatus(AppUpdaterStatus.UPDATE_DOWNLOADED)
            openModal('updater')
            break
        }
      })
    } catch (e) {
      setStatus(AppUpdaterStatus.UPDATE_FAILED)
      openModal('updater')
      console.error(`[Updater] ${e}`)
    }
  }

  const checkForUpdates = async () => {
    try {
      resetUpdater()
      const update = await check({ timeout: 30000 })
      await sleep(500)
      setUpdate(update)

      if (!update) {
        setStatus(AppUpdaterStatus.NO_UPDATE_AVAILABLE)
      } else {
        setStatus(AppUpdaterStatus.UPDATE_AVAILABLE)
        console.info(`[Updater] Found available update ${update.version} from ${update.date}`)
      }
    } catch (error) {
      setStatus(AppUpdaterStatus.ERROR)
      console.error(error)
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
    downloadedLength,
    totalUpdateLength,
    downloadAndInstall,
    cancelUpdater,
    relaunch: relaunchApp
  }
}
