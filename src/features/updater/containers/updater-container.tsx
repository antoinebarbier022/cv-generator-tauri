import { useNavigateToModal } from '@/app/router/useNavigateToModal'
import AppIcon from '@/assets/images/icon.svg?react'
import UpdateErrorSVG from '@/assets/images/update-error.svg?react'

import i18n from '@/configs/i18n.config'
import { Card, LinearProgress, Stack } from '@mui/joy'
import { partial } from 'filesize'
import { RealeaseNoteMarkdown } from '../components/release-note-markdown'
import { UpdaterModal } from '../components/updater-modal'
import { useAppUpdater } from '../hooks/useAppUpdater'
import { AppUpdaterStatus } from '../types/updater.types'

interface Props {
  open: boolean
  onClose: () => void
  config?: {
    title: string
    description: string
  }
}

export const UpdaterContainer = (props: Props) => {
  const { close: hideModal } = useNavigateToModal()

  const {
    status,
    downloadedLength,
    totalUpdateLength,
    downloadAndInstall,
    checkForUpdates,
    cancelUpdater,
    update,
    relaunch
  } = useAppUpdater()

  const handleClose = () => {
    props.onClose()
  }

  if (status === AppUpdaterStatus.NO_UPDATE_AVAILABLE) {
    return (
      <UpdaterModal
        open={props.open}
        onClose={handleClose}
        onCancel={cancelUpdater}
        config={{
          icon: <AppIcon />,
          title: 'No update available',
          description: 'You are already using the latest version',
          cancelLabel: 'Close'
        }}
      />
    )
  }

  if (update && downloadedLength !== null && status === AppUpdaterStatus.DOWNLOADING_UPDATE) {
    const isProgression = Boolean(downloadedLength && downloadedLength >= 1)
    const progression =
      downloadedLength && totalUpdateLength ? (downloadedLength / totalUpdateLength) * 100 : 0

    const size = partial({ standard: 'jedec', locale: i18n.languages[0], pad: true })
    const getTitle = () => {
      if (totalUpdateLength === null || totalUpdateLength === 0) {
        return 'Waiting...'
      }
      if (status === AppUpdaterStatus.DOWNLOADING_UPDATE) {
        return `${size(downloadedLength ?? 0)} / ${size(totalUpdateLength)}`
      }
      return 'Waiting...'
    }
    return (
      <UpdaterModal
        open={props.open}
        onCancel={hideModal}
        config={{
          icon: <AppIcon />,
          title: getTitle(),
          cancelLabel: 'Hide'
        }}
      >
        <Stack pt={2}>
          <LinearProgress
            determinate={isProgression}
            value={isProgression ? progression : undefined}
          />
        </Stack>
      </UpdaterModal>
    )
  }

  if (status === AppUpdaterStatus.UPDATE_DOWNLOADED) {
    return (
      <>
        <UpdaterModal
          open={props.open}
          onConfirm={relaunch}
          onCancel={hideModal}
          onClose={handleClose}
          config={{
            icon: <AppIcon />,
            title: `Ready to install v${update?.version}`,
            confirmLabel: 'Restart now',
            cancelLabel: 'On next launch'
          }}
        >
          <Stack pt={2}>
            <LinearProgress determinate value={100} />
          </Stack>
        </UpdaterModal>
      </>
    )
  }

  if (status === AppUpdaterStatus.DOWNLOAD_FAILED) {
    const progression =
      downloadedLength && totalUpdateLength ? (downloadedLength / totalUpdateLength) * 100 : 0
    return (
      <>
        <UpdaterModal
          open={props.open}
          onCancel={cancelUpdater}
          onConfirm={downloadAndInstall}
          config={{
            icon: <UpdateErrorSVG />,
            title: 'Failed to Download Update',
            kind: 'error',
            confirmLabel: 'Try Again'
          }}
        >
          <Stack pt={2}>
            <LinearProgress color="danger" determinate value={progression} />
          </Stack>
        </UpdaterModal>
      </>
    )
  }

  if (update && status === AppUpdaterStatus.UPDATE_AVAILABLE) {
    return (
      <UpdaterModal
        open={props.open}
        onClose={hideModal}
        onCancel={cancelUpdater}
        onConfirm={downloadAndInstall}
        config={{
          size: 'md',
          icon: <AppIcon />,
          title: `A new version is available!`,
          description: `${update.version} is now available -- you have ${update.currentVersion}`,
          confirmLabel: 'Download',
          cancelLabel: 'Remind me later'
        }}
      >
        <Card variant="soft" sx={{ mt: 1, backgroundColor: 'neutral.50' }}>
          <RealeaseNoteMarkdown content={update.body} />
        </Card>
      </UpdaterModal>
    )
  }
  if (status === AppUpdaterStatus.CHECKING_FOR_UPDATES) {
    return (
      <UpdaterModal
        open={props.open}
        onClose={handleClose}
        config={{
          icon: <AppIcon />,
          title: `Checking for updates`
        }}
      >
        <Stack pt={2}>
          <LinearProgress size="lg" />
        </Stack>
      </UpdaterModal>
    )
  }

  if (status === AppUpdaterStatus.CHECK_ERROR) {
    return (
      <UpdaterModal
        open={props.open}
        onCancel={cancelUpdater}
        onConfirm={checkForUpdates}
        config={{
          kind: status === AppUpdaterStatus.CHECK_ERROR ? 'error' : 'info',
          icon: <UpdateErrorSVG />,
          title: `Failed to check for updates`,
          confirmLabel: 'Try Again'
        }}
      ></UpdaterModal>
    )
  }

  return <></>
}
