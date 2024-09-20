import { relaunch } from '@tauri-apps/plugin-process'
import { check, Update } from '@tauri-apps/plugin-updater'
import { useEffect, useState } from 'react'
import { AppUpdaterStatus } from '../types/updater.types'

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

interface Props {
  enabled: boolean
}
export const useAppUpdater = ({
  enabled
}: Props): {
  status: AppUpdaterStatus
  update: Pick<Update, 'available' | 'version' | 'body' | 'currentVersion' | 'date'> | null
  downloadedLength: number | null
  totalUpdateLength: number | null
  relaunch: () => void
  cancelUpdater: () => void
  downloadAndInstall: () => void
} => {
  const [status, setStatus] = useState<AppUpdaterStatus>(AppUpdaterStatus.IDLE)
  const [update, setUpdate] = useState<Update | null>(null)
  const [downloadedLength, setDownloadedLength] = useState<number | null>(null)
  const [totalUpdateLength, setUpdateLength] = useState<number | null>(null)

  const cancelUpdater = () => {
    setStatus(AppUpdaterStatus.IDLE)
    setUpdate(null)
    setDownloadedLength(null)
    setUpdateLength(null)
    console.info(`[Updater] Cancel`)
  }

  const relaunchApp = async () => {
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
            break
        }
      })
    } catch (e) {
      setStatus(AppUpdaterStatus.ERROR)
      console.error(`[Updater] Error occured during download: ${e}`)
    }
  }

  const updater = async () => {
    try {
      console.info(`[Updater] Checking for updates...`)
      const update = await check({ timeout: 30000 })
      await sleep(500)
      setUpdate(update)

      if (!update) {
        setStatus(AppUpdaterStatus.NO_UPDATE_AVAILABLE)
        console.info(`[Updater] No update available`)
      }
      if (update) {
        setStatus(AppUpdaterStatus.UPDATE_AVAILABLE)
        console.info(`[Updater] Found available update ${update.version} from ${update.date}`)

        /*
        const confirmedRestart = await confirm(
          `The update has been downloaded. Restart the app to apply the update.`,
          {
            title: `Update downloaded`,
            cancelLabel: 'Cancel',
            okLabel: 'Restart',
            kind: 'info'
          }
        )
        if (!confirmedRestart) return

        console.info('update installed')
        await relaunch()
        */
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (enabled) {
      setStatus(AppUpdaterStatus.CHECKING_FOR_UPDATES)
      updater()
    }
  }, [enabled])

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
