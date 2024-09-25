import { Update } from '@tauri-apps/plugin-updater'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { AppUpdaterStatus } from '../types/updater.types'

interface State {
  autoCheckActive: boolean
  alreadyAutoCheck: boolean
  status: AppUpdaterStatus
  update: Update | null
  downloadedLength: number | null
  totalUpdateLength: number | null
  lastCheck: Date | null
  setAutoCheckActive: (value: boolean) => void
  setLastCheck: (value: Date) => void
  setAlreadyAutoCheck: (value: boolean) => void
  setStatus: (value: AppUpdaterStatus) => void
  setUpdate: (value: Update | null) => void
  setDownloadedLength: (value: number | null) => void
  setUpdateLength: (value: number | null) => void
}

export const useUpdaterStore = create(
  persist<State>(
    (set) => ({
      autoCheckActive: true,
      alreadyAutoCheck: false,
      status: AppUpdaterStatus.IDLE,
      update: null,
      downloadedLength: null,
      totalUpdateLength: null,
      lastCheck: null,
      setAutoCheckActive: (value: boolean) => {
        set(() => ({ autoCheckActive: value }))
      },
      setLastCheck: (value: Date) => {
        set(() => ({ lastCheck: value }))
      },
      setAlreadyAutoCheck: (value: boolean) => {
        set(() => ({ alreadyAutoCheck: value }))
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
      setUpdate: (value: Update | null) => {
        set(() => ({ update: value }))
      },
      setDownloadedLength: (value: number | null) => {
        set(() => ({ downloadedLength: value }))
      },
      setUpdateLength: (value: number | null) => {
        set(() => ({ totalUpdateLength: value }))
      }
    }),
    {
      name: 'updater',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
