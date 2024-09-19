import { listen } from '@tauri-apps/api/event'
import { confirm, message } from '@tauri-apps/plugin-dialog'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAskOutputPath } from '@/features/generation/hooks/useAskOutputPath'
import { useGenerate } from '@/features/generation/hooks/useGenerate'
import { MenuEvent } from '@/generated/events/menu-events'
import { useImportDataContent } from '@/hooks/useImportDataContent'
import { useResetDataStorage } from '@/hooks/useResetDataStorage'
import { useSidebarStore } from '@/stores/useSidebarStore'
import { useServerPort } from './userServerPort'

import { relaunch } from '@tauri-apps/plugin-process'

import { check } from '@tauri-apps/plugin-updater'


export const useMenuEvents = () => {
  const navigate = useNavigate()

  const routerLocation = useLocation()

  const { toggle: toggleCollapseSidebar } = useSidebarStore()

  const resetDataStorage = useResetDataStorage()

  const mutationImport = useImportDataContent()

  const setupListener = (eventName: string, navigateTo: string) => {
    return listen(eventName, () => {
      if (location.pathname !== navigateTo) {
        navigate(navigateTo, {
          state: {
            background: { ...routerLocation, pathname: location.pathname }
          }
        })
      }
    })
  }

  useEffect(() => {
    const unlisten = setupListener(MenuEvent.DebugOpenPanel, '/debug')

    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [history])

  useEffect(() => {
    const unlisten = setupListener(MenuEvent.AppPreferences, '/settings')

    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [history])

  useEffect(() => {
    const unlisten = listen(MenuEvent.FileImport, () => mutationImport.mutate())
    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [])

  {
    /** App Updater */
  }
  useEffect(() => {
    const unlisten = listen(MenuEvent.AppCheckUpdate, async (e) => {
      if (e.payload === 'check-update-from-menu') {
        try {
          console.count('check update')
          const update = await check()
          if (!update) {
            await message('You are already using the latest version.', {
              title: 'No Update Available',
              okLabel: 'OK',
              kind: 'info'
            })
          }
          if (update) {
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
                  console.info(`downloaded ${downloaded} from ${contentLength}`)
                  break
                case 'Finished':
                  console.info('download finished')
                  break
              }
            })

            console.info('update installed')
            await relaunch()
          }
        } catch (error) {
          console.error(error)
        }
      }
    })

    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [])

  useEffect(() => {
    const unlisten = setupListener(MenuEvent.FileExport, '/export')
    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [history])

  useEffect(() => {
    const unlisten = listen(MenuEvent.ViewToggleSidebar, async () => {
      toggleCollapseSidebar()
    })
    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [])

  useEffect(() => {
    const unlisten = listen(MenuEvent.FileReset, async () => {
      const confirmed = await confirm('This action cannot be reverted. Are you sure?', {
        title: 'Reset all data',
        kind: 'warning'
      })
      if (confirmed) {
        resetDataStorage.mutate()
      }
    })
    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [history])

  useEffect(() => {
    const unlisten = setupListener(MenuEvent.FileGenerate, '/generate')
    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [])

  const askOutputPath = useAskOutputPath()
  const generate = useGenerate()
  const { port: api_port } = useServerPort()

  useEffect(() => {
    const unlisten = listen(MenuEvent.FileGenerateAndSaveAs, async () => {
      askOutputPath.mutate(undefined, {
        onSettled: () => {},
        onSuccess: (outputFilePath) => {
          if (outputFilePath) {
            generate.mutate({ outputFilePath, api_port })
          }
        }
      })
      return () => {
        unlisten.then((dispose) => dispose())
      }
    })
  }, [history])

  return { isLoadingGenerate: generate.isPending }
}
