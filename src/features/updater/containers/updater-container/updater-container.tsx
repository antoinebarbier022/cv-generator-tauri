import { BetaBadge } from '@/shared/components/beta-badge'
import { UpdaterModal } from '../../components/updater-modal/updater-modal'
import { useAppUpdater } from '../../hooks/useAppUpdater'
import { AppUpdaterStatus } from '../../types/updater.types'

interface Props {
  open: boolean
  onClose: () => void
}

export const UpdaterContainer = (props: Props) => {
  const {
    status,
    update,
    currentVersion,
    downloadedLength,
    totalUpdateLength,
    downloadAndInstall,
    checkForUpdates,
    cancelUpdater,
    relaunch
  } = useAppUpdater()

  const handleClose = () => {
    props.onClose()
  }

  const handleCancel = () => {
    props.onClose()
    cancelUpdater()
  }

  const handleDownloadAndInstall = () => {
    downloadAndInstall({ autoOpenModal: true })
  }

  if (currentVersion && status === AppUpdaterStatus.NO_UPDATE_AVAILABLE) {
    return (
      <UpdaterModal
        status={AppUpdaterStatus.NO_UPDATE_AVAILABLE}
        open={props.open}
        onClose={handleClose}
        onCancel={handleCancel}
        optionalContent={{
          currentVersion
        }}
      />
    )
  }

  if (update && downloadedLength !== null && status === AppUpdaterStatus.DOWNLOADING_UPDATE) {
    return (
      <UpdaterModal
        status={AppUpdaterStatus.UPDATE_DOWNLOADED}
        open={props.open}
        onCancel={handleClose}
        optionalContent={{
          nextVersion: update?.version,
          downloadedLength: downloadedLength ?? undefined,
          totalUpdateLength: totalUpdateLength ?? undefined
        }}
      />
    )
  }

  if (status === AppUpdaterStatus.UPDATE_DOWNLOADED) {
    return (
      <div>
        <p>toto va a lecole</p>
        <UpdaterModal
          status={AppUpdaterStatus.UPDATE_DOWNLOADED}
          open={props.open}
          onClose={handleClose}
          onCancel={handleClose}
          onConfirm={relaunch}
          optionalContent={{
            nextVersion: update?.version
          }}
        />
      </div>
    )
  }

  if (status === AppUpdaterStatus.DOWNLOAD_FAILED) {
    return (
      <UpdaterModal
        status={AppUpdaterStatus.DOWNLOAD_FAILED}
        open={props.open}
        onCancel={handleCancel}
        onConfirm={handleDownloadAndInstall}
        optionalContent={{
          nextVersion: update?.version,
          downloadedLength: downloadedLength ?? undefined,
          totalUpdateLength: totalUpdateLength ?? undefined
        }}
      />
    )
  }

  if (update && status === AppUpdaterStatus.UPDATE_AVAILABLE) {
    return (
      <UpdaterModal
        status={AppUpdaterStatus.UPDATE_AVAILABLE}
        open={props.open}
        onClose={handleClose}
        onCancel={handleCancel}
        onConfirm={handleDownloadAndInstall}
        optionalContent={{
          nextVersion: update?.version,
          currentVersion: update?.currentVersion,
          releaseNote: update?.body
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
        onCancel={handleCancel}
        onConfirm={checkForUpdates}
        optionalContent={{}}
      />
    )
  }

  if (status === AppUpdaterStatus.UPDATE_SUCCESS) {
    return <div data-testid="modal-UPDATE_SUCCESS"></div>
  }

  if (status === AppUpdaterStatus.INSTALLING_UPDATE) {
    return (
      <div data-testid="modal-INSTALLING_UPDATEe">
        <p>toto</p>
        <BetaBadge />
      </div>
    )
  }

  return <></>
}
