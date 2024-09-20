import AppIcon from '@/assets/images/icon.svg?react'
import { Card, LinearProgress, Stack } from '@mui/joy'
import { filesize } from 'filesize'
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
  const { status, downloadedLength, totalUpdateLength, downloadAndInstall, cancelUpdater, update } =
    useAppUpdater({
      enabled: props.open
    })

  const handleClose = () => {
    cancelUpdater()
    props.onClose()
  }

  if (status === AppUpdaterStatus.NO_UPDATE_AVAILABLE) {
    return (
      <UpdaterModal
        open={props.open}
        onClose={handleClose}
        config={{
          icon: <AppIcon />,
          title: 'No update available',
          description: 'You are already using the latest version',
          hideConfirmButton: true
        }}
      />
    )
  }

  if (
    (update && downloadedLength !== null && status === AppUpdaterStatus.DOWNLOADING_UPDATE) ||
    status === AppUpdaterStatus.UPDATE_DOWNLOADED
  ) {
    const isProgression = Boolean(downloadedLength && downloadedLength >= 1)
    const progression =
      downloadedLength && totalUpdateLength ? (downloadedLength / totalUpdateLength) * 100 : 0
    console.log(progression)
    const getTitle = () => {
      if (totalUpdateLength === null || totalUpdateLength === 0) {
        return 'Waiting...'
      }
      if (AppUpdaterStatus.UPDATE_DOWNLOADED) {
        return `${filesize(downloadedLength ?? 0, { standard: 'jedec' })} / ${filesize(totalUpdateLength, { standard: 'jedec' })}`
      }
      return 'Waiting 2...'
    }
    return (
      <UpdaterModal
        open={props.open}
        onClose={handleClose}
        config={{
          icon: <AppIcon />,
          title: getTitle(),
          hideConfirmButton: true
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

  if (update && status === AppUpdaterStatus.UPDATE_AVAILABLE) {
    return (
      <UpdaterModal
        open={props.open}
        onClose={handleClose}
        onConfirm={downloadAndInstall}
        config={{
          size: 'md',
          icon: <AppIcon />,
          title: `A new version is available!`,
          description: `${update.version} is now available -- you have ${update.currentVersion}`,
          confirmLabel: 'Download and Install'
        }}
      >
        <Card variant="soft" sx={{ mt: 1, backgroundColor: 'neutral.50' }}>
          <RealeaseNoteMarkdown content={update.body} />
        </Card>
      </UpdaterModal>
    )
  }
  if (update && status === AppUpdaterStatus.CHECKING_FOR_UPDATES) {
    return (
      <UpdaterModal
        open={props.open}
        onClose={handleClose}
        config={{
          icon: <AppIcon />,
          title: `Checking for updates`,
          hideConfirmButton: true
        }}
      >
        <Stack pt={2}>
          <LinearProgress size="lg" />
        </Stack>
      </UpdaterModal>
    )
  }

  return <></>
}
