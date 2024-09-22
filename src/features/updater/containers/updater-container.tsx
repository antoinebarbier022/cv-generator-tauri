import { useNavigateToModal } from '@/app/router/useNavigateToModal'
import AppIcon from '@/assets/images/icon.svg?react'
import UpdateErrorSVG from '@/assets/images/update-error.svg?react'

import i18n from '@/configs/i18n.config'
import { Card, LinearProgress, Stack } from '@mui/joy'
import { partial } from 'filesize'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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

  if (status === AppUpdaterStatus.NO_UPDATE_AVAILABLE) {
    return (
      <UpdaterModal
        open={props.open}
        onClose={handleClose}
        onCancel={cancelUpdater}
        config={{
          icon: <AppIcon />,
          title: t('updater.no-update.title'),
          description: t('updater.no-update.description', {
            currentVersion: currentVersion ?? ''
          }),
          cancelLabel: t('updater.no-update.cancel')
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
        return t('updater.downloading-update.waiting')
      }
      if (status === AppUpdaterStatus.DOWNLOADING_UPDATE) {
        return `${size(downloadedLength ?? 0)} / ${size(totalUpdateLength)}`
      }
      return t('updater.downloading-update.waiting')
    }
    return (
      <UpdaterModal
        open={props.open}
        onCancel={hideModal}
        config={{
          icon: <AppIcon />,
          title: getTitle(),
          cancelLabel: t('updater.downloading-update.cancel')
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
            title: t('updater.update-downloaded.title', { version: update?.version }),
            confirmLabel: t('updater.update-downloaded.confirm'),
            cancelLabel: t('updater.update-downloaded.cancel')
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
            title: t('updater.download-failed.title'),
            kind: 'error',
            confirmLabel: t('updater.download-failed.confirm')
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
          title: t('updater.update-available.title'),
          description: t('updater.update-available.description', {
            newVersion: update.version,
            currentVersion: update.currentVersion
          }),
          confirmLabel: t('updater.update-available.confirm'),
          cancelLabel: t('updater.update-available.cancel')
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
          title: t('updater.checking-for-updates.title')
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
          title: t('updater.check-error.title'),
          confirmLabel: t('updater.check-error.confirm')
        }}
      ></UpdaterModal>
    )
  }

  return <></>
}
