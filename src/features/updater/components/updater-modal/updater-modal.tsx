import AppIcon from '@/assets/images/icon.svg?react'
import UpdateErrorSVG from '@/assets/images/update-error.svg?react'

import i18n from '@/configs/i18n.config'
import { Card, LinearProgress, Stack } from '@mui/joy'
import { partial } from 'filesize'
import { useTranslation } from 'react-i18next'
import { AppUpdaterStatus } from '../../types/updater.types'
import { RealeaseNoteMarkdown } from '../release-note-markdown'
import { UpdaterModalLayout } from '../updater-modal-layout/updater-modal-layout'

interface Props {
  open: boolean
  status: AppUpdaterStatus
  onClose?: () => void
  onCancel?: () => void
  onConfirm?: () => void
  optionalContent: {
    currentVersion?: string
    nextVersion?: string
    downloadedLength?: number
    totalUpdateLength?: number
    releaseNote?: string
  }
}

export const UpdaterModal = (props: Props) => {
  const { t } = useTranslation()

  const { currentVersion, nextVersion, releaseNote, downloadedLength, totalUpdateLength } =
    props.optionalContent

  if (props.status === AppUpdaterStatus.NO_UPDATE_AVAILABLE) {
    return (
      <UpdaterModalLayout
        dataTestid={`modal-${props.status}`}
        open={props.open}
        onClose={props.onClose}
        onCancel={props.onCancel}
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

  if (props.status === AppUpdaterStatus.DOWNLOADING_UPDATE) {
    const isProgression = Boolean(downloadedLength && downloadedLength >= 1)
    const progression =
      downloadedLength && totalUpdateLength ? (downloadedLength / totalUpdateLength) * 100 : 0

    const size = partial({ standard: 'jedec', locale: i18n.languages[0], pad: true })
    const getTitle = () => {
      if (totalUpdateLength === null || totalUpdateLength === 0) {
        return t('updater.downloading-update.waiting')
      }
      if (!totalUpdateLength) {
        return 'error'
      }
      if (props.status === AppUpdaterStatus.DOWNLOADING_UPDATE) {
        return `${size(downloadedLength ?? 0)} / ${size(totalUpdateLength)}`
      }
      return t('updater.downloading-update.waiting')
    }
    return (
      <UpdaterModalLayout
        dataTestid={`modal-${props.status}`}
        open={props.open}
        onCancel={props.onCancel}
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
      </UpdaterModalLayout>
    )
  }

  if (props.status === AppUpdaterStatus.UPDATE_DOWNLOADED) {
    return (
      <>
        <UpdaterModalLayout
          dataTestid={`modal-${props.status}`}
          open={props.open}
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
          onClose={props.onClose}
          config={{
            icon: <AppIcon />,
            title: t('updater.update-downloaded.title', { version: nextVersion }),
            confirmLabel: t('updater.update-downloaded.confirm'),
            cancelLabel: t('updater.update-downloaded.cancel')
          }}
        >
          <Stack pt={2}>
            <LinearProgress determinate value={100} />
          </Stack>
        </UpdaterModalLayout>
      </>
    )
  }

  if (props.status === AppUpdaterStatus.DOWNLOAD_FAILED) {
    const progression =
      downloadedLength && totalUpdateLength ? (downloadedLength / totalUpdateLength) * 100 : 0
    return (
      <>
        <UpdaterModalLayout
          dataTestid={`modal-${props.status}`}
          open={props.open}
          onCancel={props.onCancel}
          onConfirm={props.onConfirm}
          config={{
            icon: <UpdateErrorSVG />,
            title: t('updater.download-failed.title'),
            description: nextVersion && `v${nextVersion}`,
            kind: 'error',
            confirmLabel: t('updater.download-failed.confirm')
          }}
        >
          <Stack pt={2}>
            <LinearProgress color="danger" determinate value={progression} />
          </Stack>
        </UpdaterModalLayout>
      </>
    )
  }

  if (props.status === AppUpdaterStatus.UPDATE_AVAILABLE) {
    return (
      <UpdaterModalLayout
        dataTestid={`modal-${props.status}`}
        open={props.open}
        onClose={props.onClose}
        onCancel={props.onCancel}
        onConfirm={props.onConfirm}
        config={{
          size: 'md',
          icon: <AppIcon />,
          title: t('updater.update-available.title'),
          description: t('updater.update-available.description', {
            newVersion: nextVersion,
            currentVersion: currentVersion
          }),
          confirmLabel: t('updater.update-available.confirm'),
          cancelLabel: t('updater.update-available.cancel')
        }}
      >
        {releaseNote && (
          <Card variant="soft" sx={{ mt: 1, backgroundColor: 'neutral.50' }}>
            <RealeaseNoteMarkdown content={releaseNote} />
          </Card>
        )}
      </UpdaterModalLayout>
    )
  }
  if (props.status === AppUpdaterStatus.CHECKING_FOR_UPDATES) {
    return (
      <UpdaterModalLayout
        dataTestid={`modal-${props.status}`}
        open={props.open}
        onClose={props.onClose}
        config={{
          icon: <AppIcon />,
          title: t('updater.checking-for-updates.title')
        }}
      >
        <Stack pt={2}>
          <LinearProgress size="lg" />
        </Stack>
      </UpdaterModalLayout>
    )
  }

  if (props.status === AppUpdaterStatus.CHECK_ERROR) {
    return (
      <UpdaterModalLayout
        dataTestid={`modal-${props.status}`}
        open={props.open}
        onCancel={props.onCancel}
        onConfirm={props.onConfirm}
        config={{
          kind: props.status === AppUpdaterStatus.CHECK_ERROR ? 'error' : 'info',
          icon: <UpdateErrorSVG />,
          title: t('updater.check-error.title'),
          confirmLabel: t('updater.check-error.confirm')
        }}
      ></UpdaterModalLayout>
    )
  }

  return <></>
}
