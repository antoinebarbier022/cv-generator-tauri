export enum AppUpdaterStatus {
  IDLE = 'idle',
  CHECKING_FOR_UPDATES = 'checking_for_updates',
  UPDATE_AVAILABLE = 'update_available',
  NO_UPDATE_AVAILABLE = 'no_update_available',
  DOWNLOADING_UPDATE = 'downloading_update',
  UPDATE_DOWNLOADED = 'update_downloaded',
  INSTALLING_UPDATE = 'installing_update',
  DOWNLOAD_FAILED = 'download_failed',
  UPDATE_SUCCESS = 'update_success',
  CHECK_ERROR = 'check_error'
}

export interface UpdaterEventPayload {
  openModalBeforeCheck: boolean
  openModalAfterCheck: boolean
}
