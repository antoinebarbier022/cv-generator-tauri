import { AspectRatio, Button, Modal, ModalClose, ModalDialog, Stack, Typography } from '@mui/joy'

import { PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren {
  open: boolean
  onClose?: () => void
  onConfirm?: () => void
  onCancel?: () => void
  config?: {
    kind?: 'error' | 'info'
    size?: 'sm' | 'md'
    icon: ReactNode | null
    title?: string
    description?: string
    releaseNotes?: string
    confirmLabel?: string
    cancelLabel?: string
  }
}

export const UpdaterModal = ({
  open,
  onClose,
  onConfirm,
  onCancel,
  config = {
    kind: 'info',
    size: 'sm',
    icon: undefined,
    title: undefined,
    description: undefined,
    releaseNotes: undefined,
    confirmLabel: 'OK',
    cancelLabel: 'Cancel'
  },
  children
}: Props) => {
  const {
    kind = 'info',
    size = 'sm',
    icon = undefined,
    title,
    description,
    confirmLabel: okLabel = 'OK',
    cancelLabel = 'Cancel'
  } = config

  const color = kind === 'error' ? 'danger' : undefined

  const width = size === 'sm' ? '380px' : '650px'
  const direction = size === 'sm' ? 'column' : 'row'
  const alignement = size === 'sm' ? 'center' : undefined
  const marginRight = size === 'sm' ? undefined : 0

  const marginTop = size === 'sm' ? 2 : 0
  const paddingTop = size === 'sm' ? 0 : 2.5
  const marginBottom = size === 'sm' ? 1 : 0

  const actionsButtonDirection = size === 'sm' ? 'column-reverse' : 'row'
  return (
    <Modal open={open}>
      <ModalDialog
        size="lg"
        sx={{ minWidth: width, maxWidth: width, width: width, minHeight: '340px' }}
      >
        {onClose && <ModalClose onClick={onClose} />}
        <Stack
          direction={direction}
          alignItems={alignement}
          gap={2}
          width={'100%'}
          sx={{ px: 2, mt: marginTop, mb: marginBottom }}
        >
          {icon && (
            <AspectRatio variant="plain" ratio={1} sx={{ m: 2, width: '60px' }}>
              {icon}
            </AspectRatio>
          )}

          <Stack gap={8} width={'100%'} sx={{ paddingTop: paddingTop }}>
            <Stack gap={1} marginRight={marginRight}>
              <Stack gap={0.5}>
                {title && (
                  <Typography color={color} level="title-md" width={'100%'} textAlign={alignement}>
                    {title}
                  </Typography>
                )}

                {description && (
                  <Typography
                    color={color}
                    level="body-sm"
                    textColor={'text.tertiary'}
                    textAlign={alignement}
                  >
                    {description}
                  </Typography>
                )}
              </Stack>
              <Stack>{children}</Stack>
            </Stack>

            <Stack
              direction={actionsButtonDirection}
              justifyContent={alignement ?? 'flex-end'}
              gap={1}
            >
              {onCancel && (
                <Button variant="soft" color="neutral" onClick={onCancel} sx={{ flex: '1' }}>
                  {cancelLabel}
                </Button>
              )}
              {onConfirm && (
                <Button color={color} sx={{ flex: '1' }} onClick={onConfirm}>
                  {okLabel}
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
