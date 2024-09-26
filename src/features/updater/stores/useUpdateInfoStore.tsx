import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { AppUpdaterStatus } from '../types/updater.types'

interface UpdateInfoState {
  status: AppUpdaterStatus
  currentVersion: string | null
  nextVersion: string | null
  releaseNote: string | null
  downloadedLength: number | null
  totalUpdateLength: number | null
  reset: () => void
  setStatus: (value: AppUpdaterStatus) => void
  setCurrentVersion: (value: string | null) => void
  setNextVersion: (value: string | null) => void
  setReleaseNote: (value: string | null) => void
  setDownloadedLength: (value: number | null) => void
  setUpdateLength: (value: number | null) => void
}

export const useUpdateInfoStore = create(
  persist<UpdateInfoState>(
    (set) => ({
      status: AppUpdaterStatus.IDLE,

      currentVersion: null,
      nextVersion: null,
      releaseNote: null,
      downloadedLength: null,
      totalUpdateLength: null,
      reset: () => {
        console.info(`[Updater] Reset Update Info Store`)
        set(() => ({ status: AppUpdaterStatus.IDLE }))
        set(() => ({ currentVersion: null }))
        set(() => ({ nextVersion: null }))
        set(() => ({ releaseNote: null }))
        set(() => ({ downloadedLength: null }))
        set(() => ({ totalUpdateLength: null }))
      },
      setStatus: (value: AppUpdaterStatus) => {
        switch (value) {
          case AppUpdaterStatus.CHECKING_FOR_UPDATES:
            console.info(`[Updater] Checking for updates...`)
            break
          case AppUpdaterStatus.DOWNLOADING_UPDATE:
            break
          case AppUpdaterStatus.CHECK_ERROR:
            console.error(`[Updater] An error occurred during the update process`)
            break
          case AppUpdaterStatus.NO_UPDATE_AVAILABLE:
            console.info(`[Updater] No update available`)
            break
          case AppUpdaterStatus.DOWNLOAD_FAILED:
            console.error(`[Updater] Download failed`)
            break
          case AppUpdaterStatus.UPDATE_SUCCESS:
            console.info(`[Updater] Update successfully installed`)
            break
          case AppUpdaterStatus.IDLE:
            console.info(`[Updater] Idle`)
            break
          case AppUpdaterStatus.INSTALLING_UPDATE:
            console.info(`[Updater] Installing update`)
            break
          case AppUpdaterStatus.UPDATE_AVAILABLE:
            console.info(`[Updater] Update available for download`)
            break
          case AppUpdaterStatus.UPDATE_DOWNLOADED:
            console.info(`[Updater] Update downloaded and ready to install`)
            break
          default:
            console.warn(`[Updater] Unknown updater status`)
            break
        }
        set(() => ({ status: value }))
      },
      setCurrentVersion: (value: string | null) => {
        set(() => ({ currentVersion: value }))
      },
      setNextVersion: (value: string | null) => {
        set(() => ({ nextVersion: value }))
      },
      setReleaseNote: (value: string | null) => {
        set(() => ({ releaseNote: value }))
      },
      setDownloadedLength: (value: number | null) => {
        set(() => ({ downloadedLength: value }))
      },
      setUpdateLength: (value: number | null) => {
        set(() => ({ totalUpdateLength: value }))
      }
    }),
    {
      name: 'update-info',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
