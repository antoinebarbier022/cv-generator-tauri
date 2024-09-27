import { UpdaterModal } from '../../components/updater-modal/updater-modal'
import { useUpdater } from '../../hooks/useUpdater'
import { AppUpdaterStatus } from '../../types/updater.types'

interface Props {
  open: boolean
  onClose: () => void
}

export const UpdaterContainer = (props: Props) => {
  const {
    status,
    nextVersion,
    releaseNote,
    currentVersion,
    downloadedLength,
    totalUpdateLength,
    downloadAndInstall,
    checkForUpdates,
    resetUpdater,
    relaunchApplication
  } = useUpdater()

  const handleClose = () => {
    props.onClose()
  }

  const handleResetUpdater = () => {
    props.onClose()
    resetUpdater()
  }

  const handleDownloadAndInstall = downloadAndInstall
  const handleRelaunchApplication = relaunchApplication

  if (currentVersion && status === AppUpdaterStatus.NO_UPDATE_AVAILABLE) {
    return (
      <UpdaterModal
        status={AppUpdaterStatus.NO_UPDATE_AVAILABLE}
        open={props.open}
        onClose={handleClose}
        onCancel={handleResetUpdater}
        optionalContent={{
          currentVersion
        }}
      />
    )
  }

  if (downloadedLength !== null && status === AppUpdaterStatus.DOWNLOADING_UPDATE) {
    return (
      <UpdaterModal
        status={AppUpdaterStatus.DOWNLOADING_UPDATE}
        open={props.open}
        onCancel={handleClose}
        optionalContent={{
          nextVersion: nextVersion ?? undefined,
          downloadedLength: downloadedLength ?? undefined,
          totalUpdateLength: totalUpdateLength ?? undefined
        }}
      />
    )
  }

  if (nextVersion && status === AppUpdaterStatus.UPDATE_DOWNLOADED) {
    return (
      <UpdaterModal
        status={AppUpdaterStatus.UPDATE_DOWNLOADED}
        open={props.open}
        onClose={handleClose}
        onCancel={handleClose}
        onConfirm={handleRelaunchApplication}
        optionalContent={{
          nextVersion: nextVersion
        }}
      />
    )
  }

  if (status === AppUpdaterStatus.DOWNLOAD_FAILED) {
    return (
      <UpdaterModal
        status={AppUpdaterStatus.DOWNLOAD_FAILED}
        open={props.open}
        onCancel={handleResetUpdater}
        onConfirm={handleDownloadAndInstall}
        optionalContent={{
          nextVersion: nextVersion ?? undefined,
          downloadedLength: downloadedLength ?? undefined,
          totalUpdateLength: totalUpdateLength ?? undefined
        }}
      />
    )
  }

  if (status === AppUpdaterStatus.UPDATE_AVAILABLE) {
    return (
      <UpdaterModal
        status={AppUpdaterStatus.UPDATE_AVAILABLE}
        open={props.open}
        onClose={handleClose}
        onCancel={handleResetUpdater}
        onConfirm={handleDownloadAndInstall}
        optionalContent={{
          nextVersion: nextVersion ?? undefined,
          currentVersion: currentVersion ?? undefined,
          releaseNote: releaseNote ?? undefined
        }}
      />
    )
  }

  if (status === AppUpdaterStatus.CHECKING_FOR_UPDATES) {
    return (
      <UpdaterModal
        status={AppUpdaterStatus.CHECKING_FOR_UPDATES}
        open={props.open}
        onClose={handleClose}
        optionalContent={{}}
      />
    )
  }

  if (status === AppUpdaterStatus.CHECK_ERROR) {
    return (
      <UpdaterModal
        status={AppUpdaterStatus.CHECK_ERROR}
        open={props.open}
        onCancel={handleResetUpdater}
        onConfirm={checkForUpdates}
        optionalContent={{}}
      />
    )
  }

  return <></>
}
