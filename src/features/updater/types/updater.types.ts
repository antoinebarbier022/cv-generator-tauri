export enum AppUpdaterStatus {
  IDLE = 'idle',
  CHECKING_FOR_UPDATES = 'checking_for_updates',
  UPDATE_AVAILABLE = 'update_available',
  NO_UPDATE_AVAILABLE = 'no_update_available',
  DOWNLOADING_UPDATE = 'downloading_update',
  DOWNLOAD_ERROR = 'download_error',
  UPDATE_DOWNLOADED = 'update_downloaded',
  INSTALLING_UPDATE = 'installing_update',
  UPDATE_FAILED = 'update_failed',
  UPDATE_SUCCESS = 'update_success',
  ERROR = 'error'
}
