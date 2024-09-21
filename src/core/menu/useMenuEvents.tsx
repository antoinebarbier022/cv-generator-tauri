import { listen } from '@tauri-apps/api/event'
import { confirm } from '@tauri-apps/plugin-dialog'
import { useEffect } from 'react'

import { useImportDataContent } from '@/core/storage/useImportDataContent'
import { useResetDataStorage } from '@/core/storage/useResetDataStorage'
import { useAskOutputPath } from '@/features/generation/hooks/useAskOutputPath'
import { useGenerate } from '@/features/generation/hooks/useGenerate'
import { MenuEvent } from '@/generated/events/menu-events'

import { useUpdaterStore } from '@/features/updater/stores/updater.store'
import { AppUpdaterStatus } from '@/features/updater/types/updater.types'
import { useNavigateToModal } from '../../app/router/useNavigateToModal'
import { useSidebarStore } from '../sidebar/stores/useSidebarStore'

export const useMenuEvents = () => {
  const modal = useNavigateToModal()
  const { toggle: toggleCollapseSidebar } = useSidebarStore()

  const resetDataStorage = useResetDataStorage()

  const mutationImport = useImportDataContent()

  const askOutputPath = useAskOutputPath()
  const generate = useGenerate()

  const { setStatus } = useUpdaterStore()

  useEffect(() => {
    const unlisten = listen(MenuEvent.DebugOpenPanel, () => modal.open('debug'))
    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [])

  useEffect(() => {
    const unlisten = listen(MenuEvent.AppPreferences, () => modal.open('settings'))
    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [])

  useEffect(() => {
    const unlisten = listen(MenuEvent.FileImport, () => mutationImport.mutate())
    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [])

  useEffect(() => {
    const unlisten = listen(MenuEvent.AppCheckUpdate, async (e) => {
      if (e.payload === 'check-update-from-menu') {
        setStatus(AppUpdaterStatus.CHECKING_FOR_UPDATES)
        modal.open('updater')
      }
    })
    return () => {
      unlisten.then((dispose) => dispose())
    }
  }, [])

  useEffect(() => {
    const unlisten = listen(MenuEvent.ViewToggleSidebar, async () => toggleCollapseSidebar())
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
  }, [])

  useEffect(() => {
    const unlisten = listen(MenuEvent.FileGenerateAndSaveAs, async () => {
      askOutputPath.mutate(undefined, {
        onSuccess: (outputFilePath) => {
          if (outputFilePath) {
            generate.mutate({ outputFilePath })
          }
        }
      })
      return () => {
        unlisten.then((dispose) => dispose())
      }
    })
  }, [])

  return { isLoadingGenerate: generate.isPending }
}
