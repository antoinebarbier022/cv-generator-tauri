import { AspectRatio, Button, Modal, ModalClose, ModalDialog, Stack, Typography } from '@mui/joy'

import { PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  config?: {
    size?: 'sm' | 'md'
    icon: ReactNode | null
    title?: string
    description?: string
    releaseNotes?: string
    confirmLabel?: string
    cancelLabel?: string
    hideConfirmButton?: boolean
  }
}

export const UpdaterModal = ({
  open,
  onClose,
  onConfirm,
  config = {
    size: 'sm',
    icon: undefined,
    title: undefined,
    description: undefined,
    releaseNotes: undefined,
    confirmLabel: 'OK',
    cancelLabel: 'Cancel',
    hideConfirmButton: false
  },
  children
}: Props) => {
  const {
    size = 'sm',
    icon = undefined,
    title,
    description,
    confirmLabel: okLabel = 'OK',
    cancelLabel = 'Cancel',
    hideConfirmButton = false
  } = config

  const width = size === 'sm' ? '380px' : '650px'
  const direction = size === 'sm' ? 'column' : 'row'
  const alignement = size === 'sm' ? 'center' : undefined
  const marginRight = size === 'sm' ? undefined : 0

  const marginTop = size === 'sm' ? 2 : 0
  const paddingTop = size === 'sm' ? 0 : 2.5
  const marginBottom = size === 'sm' ? 1 : 0
  return (
    <Modal open={open}>
      <ModalDialog size="lg" sx={{ minWidth: width, maxWidth: width, width: width }}>
        <ModalClose onClick={onClose} />
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
              <Stack>
                {title && (
                  <Typography level="title-md" textAlign={alignement}>
                    {title}
                  </Typography>
                )}

                {description && (
                  <Typography level="body-sm" textColor={'text.tertiary'} textAlign={alignement}>
                    {description}
                  </Typography>
                )}
              </Stack>
              <Stack>{children}</Stack>
            </Stack>

            <Stack direction={'row'} justifyContent={alignement ?? 'flex-end'} gap={1}>
              <Button variant="soft" color="neutral" onClick={onClose} sx={{ flex: '1' }}>
                {cancelLabel}
              </Button>
              {!hideConfirmButton && onConfirm && (
                <Button sx={{ flex: '1' }} onClick={onConfirm}>
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
