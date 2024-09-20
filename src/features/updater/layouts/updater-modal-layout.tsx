import {
  AspectRatio,
  Button,
  LinearProgress,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography
} from '@mui/joy'

import { ReactNode } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  config?: {
    icon: ReactNode
    title: string
    description?: string
    releaseNotes?: string
  }
}

export const UpdaterModalLayout = (props: Props) => {
  return (
    <Modal open={props.open}>
      <ModalDialog sx={{ minWidth: '500px', maxWidth: '500px', width: '500px' }}>
        <ModalClose onClick={props.onClose} />

        {props.config?.icon && (
          <AspectRatio variant="plain" ratio={1} sx={{ width: '60px' }}>
            {props.config?.icon}
          </AspectRatio>
        )}

        <Stack gap={4}>
          <Stack gap={1}>
            <Typography level="title-md">{props.config?.title}</Typography>

            <Typography level="body-sm" textColor={'text.tertiary'}>
              {props.config?.description}
            </Typography>

            <Typography level="body-sm" textColor={'text.tertiary'}>
              {props.config?.releaseNotes}
            </Typography>
            <LinearProgress />
          </Stack>

          <Stack direction={'row'} justifyContent={'flex-end'} gap={1}>
            <Button variant="soft" color="neutral" onClick={props.onClose}>
              Cancel
            </Button>
            <Button>OK</Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
