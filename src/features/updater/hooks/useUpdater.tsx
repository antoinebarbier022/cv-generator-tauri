import { getVersion } from '@tauri-apps/api/app'
import { relaunch } from '@tauri-apps/plugin-process'
import { check, Update } from '@tauri-apps/plugin-updater'
import { useEffect } from 'react'
import { useUpdateInfoStore } from '../stores/useUpdateInfoStore'
import { useUpdateSettingsStore } from '../stores/useUpdateSettingsStore'
import { AppUpdaterStatus } from '../types/updater.types'

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export interface UpdaterHookResponse {
  status: AppUpdaterStatus
  nextVersion: string | null
  releaseNote: string | null
  currentVersion: string | null
  downloadedLength: number | null
  totalUpdateLength: number | null
  checkForUpdates: () => Promise<Update | null>
  downloadAndInstall: () => Promise<void>
  relaunchApplication: () => Promise<void>
  resetUpdater: () => void
}

export const useUpdater = (): UpdaterHookResponse => {
  const {
    status,
    currentVersion,
    nextVersion,
    releaseNote: releaseNote,
    downloadedLength,
    totalUpdateLength,
    setStatus,
    setCurrentVersion,
    setNextVersion,
    setReleaseNote: setReleaseNote,
    setDownloadedLength,
    setUpdateLength,
    reset: resetUpdater
  } = useUpdateInfoStore()

  const { setLastCheck } = useUpdateSettingsStore()

  const relaunchApplication = async () => {
    console.info(`[Updater] Relaunch application CV Generator.`)
    setStatus(AppUpdaterStatus.UPDATE_SUCCESS)
    await relaunch()
  }

  const downloadAndInstall = async () => {
    setStatus(AppUpdaterStatus.DOWNLOADING_UPDATE)
    const update = await check({ timeout: 10000 })
    if (!update || !update.available) {
      setStatus(AppUpdaterStatus.DOWNLOAD_FAILED)
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
              break
          }
        },
        {
          timeout: 300000 // 5min,
        }
      )
    } catch (e) {
      setStatus(AppUpdaterStatus.DOWNLOAD_FAILED)
      console.error(`[Updater] ${e}`)
    }
  }

  const checkForUpdates = async () => {
    resetUpdater()
    setStatus(AppUpdaterStatus.CHECKING_FOR_UPDATES)
    setLastCheck(new Date())
    try {
      const update = await check({ timeout: 10000 })
      await sleep(500)

      if (!update) {
        setStatus(AppUpdaterStatus.NO_UPDATE_AVAILABLE)
        const version = await getVersion()
        setCurrentVersion(version)
      } else {
        setNextVersion(update.version)
        setReleaseNote(update.body ?? null)
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
    getVersion().then((version) => setCurrentVersion(version))
  }, [])

  return {
    status,
    nextVersion,
    releaseNote,
    currentVersion,
    downloadedLength,
    totalUpdateLength,
    checkForUpdates,
    downloadAndInstall,
    relaunchApplication,
    resetUpdater
  }
}
