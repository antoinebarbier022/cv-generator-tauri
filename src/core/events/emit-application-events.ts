import { ErrorContent } from '@/generated/errors/types/errors'
import { MenuEvent } from '@/generated/events/menu-events'
import { UpdaterEventPayload } from '@/generated/events/types/event'
import { emit } from '@tauri-apps/api/event'

export const emitApplicationEvents = {
  checkForUpdates: (payload: UpdaterEventPayload) => emit(MenuEvent.AppCheckUpdate, payload),
  generatePPTX: () => emit(MenuEvent.FileGenerateAndSaveAs),
  errorToBackend: (payload: ErrorContent) => emit('error', payload)
}
