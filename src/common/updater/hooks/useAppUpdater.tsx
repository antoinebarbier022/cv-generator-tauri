import { getName } from '@tauri-apps/api/app'
import { confirm, message } from '@tauri-apps/plugin-dialog'
import { relaunch } from '@tauri-apps/plugin-process'
import { check } from '@tauri-apps/plugin-updater'
import { useEffect } from 'react'
import { AppUpdaterStatus } from '../types/updater.types'

export const useAppUpdater = () => {
  useEffect(() => {
    const updater = async () => {
      try {
        console.count('check update')

        const update = await check()
        console.log(update?.available)
        if (!update) {
          await message('You are already using the latest version.', {
            title: 'No Update Available',
            okLabel: 'OK',
            kind: 'info'
          })
        }
        if (update) {
          const appName = await getName()
          const confirmedDownload = await confirm(
            `${update.version} is now available -- you have ${update.currentVersion}${
              update.body && '\n\n' + update.body
            }`,
            {
              title: `A new version of ${appName} is available!`,
              cancelLabel: 'Cancel',
              okLabel: 'Update and install',
              kind: 'info'
            }
          )
          if (!confirmedDownload) return
          console.info(
            `found update ${update.version} from ${update.date} with notes ${update.body}`
          )
          let downloaded = 0
          let contentLength = 0
          // alternatively we could also call update.download() and update.install() separately
          await update.downloadAndInstall((event) => {
            switch (event.event) {
              case 'Started':
                contentLength = event.data.contentLength ?? 0
                console.info(`started downloading ${event.data.contentLength} bytes`)
                break
              case 'Progress':
                downloaded += event.data.chunkLength
                console.info(`⬇ downloaded ${downloaded} from ${contentLength}`)
                break
              case 'Finished':
                console.info('download finished')
                break
            }
          })

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
        }
      } catch (error) {
        console.error(error)
      }
    }
    updater()
  }, [])

  return { status: AppUpdaterStatus.IDLE }
}
