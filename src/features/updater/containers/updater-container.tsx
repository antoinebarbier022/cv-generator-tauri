import AppIcon from '@/assets/images/icon.svg?react'
import { useAppUpdater } from '../hooks/useAppUpdater'
import { UpdaterModalLayout } from '../layouts/updater-modal-layout'

interface Props {
  open: boolean
  onClose: () => void
  config?: {
    title: string
    description: string
  }
}

export const UpdaterContainer = (props: Props) => {
  useAppUpdater({ enabled: props.open })
  return (
    <UpdaterModalLayout
      open={props.open}
      onClose={props.onClose}
      config={{
        icon: <AppIcon />,
        title: 'No update available',
        description: 'You are already using the latest version'
      }}
    />
  )
}
