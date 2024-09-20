import { listen } from '@tauri-apps/api/event'
import { confirm } from '@tauri-apps/plugin-dialog'
import { useEffect } from 'react'

import { useImportDataContent } from '@/core/storage/useImportDataContent'
import { useResetDataStorage } from '@/core/storage/useResetDataStorage'
import { useAskOutputPath } from '@/features/generation/hooks/useAskOutputPath'
import { useGenerate } from '@/features/generation/hooks/useGenerate'
import { MenuEvent } from '@/generated/events/menu-events'

import { useServerPort } from '../../shared/hooks/userServerPort'

import { useNavigateToModal } from '../../app/router/useNavigateToModal'
import { useSidebarStore } from '../sidebar/stores/useSidebarStore'

export const useMenuEvents = () => {
  const modal = useNavigateToModal()
  const { toggle: toggleCollapseSidebar } = useSidebarStore()

  const resetDataStorage = useResetDataStorage()

  const mutationImport = useImportDataContent()

  const setupListener = (eventName: string, navigateTo: string) => {
    return listen(eventName, () => {
      if (location.pathname !== navigateTo) {
        modal.open(navigateTo)
      }
    })
  }

  useEffect(() => {
    const unlisten = setupListener(MenuEvent.DebugOpenPanel, 'debug')

    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [history])

  useEffect(() => {
    const unlisten = setupListener(MenuEvent.AppPreferences, 'settings')

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
        modal.open('updater')
      }
    })

    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [])

  useEffect(() => {
    const unlisten = setupListener(MenuEvent.FileExport, 'export')
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
    const unlisten = setupListener(MenuEvent.FileGenerate, 'generate')
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
