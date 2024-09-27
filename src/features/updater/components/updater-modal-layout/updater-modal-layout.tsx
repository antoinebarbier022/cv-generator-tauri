import { AspectRatio, Button, Modal, ModalClose, ModalDialog, Stack, Typography } from '@mui/joy'

import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren, HTMLAttributes<Element> {
  open: boolean
  dataTestid?: string
  onClose?: () => void
  onConfirm?: () => void
  onCancel?: () => void
  config?: {
    kind?: 'error' | 'info'
    size?: 'sm' | 'md'
    icon: ReactNode | null
    title?: string
    description?: string
    releaseNote?: string
    confirmLabel?: string
    cancelLabel?: string
  }
}

export const UpdaterModalLayout = ({
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
    releaseNote: undefined,
    confirmLabel: 'OK',
    cancelLabel: 'Cancel'
  },
  dataTestid,
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
  const minHeight = size === 'sm' ? '240px' : undefined
  const direction = size === 'sm' ? 'column' : 'row'
  const alignement = size === 'sm' ? 'center' : undefined
  const marginRight = size === 'sm' ? undefined : 0

  const marginTop = size === 'sm' ? 2 : 0
  const paddingTop = size === 'sm' ? 0 : 2.5
  const marginBottom = 1

  const actionsButtonDirection = size === 'sm' ? 'column-reverse' : 'row'
  return (
    <Modal open={open} data-testid={dataTestid}>
      <ModalDialog
        size="lg"
        sx={{ minWidth: width, maxWidth: width, width: width, minHeight: minHeight }}
      >
        {onClose && <ModalClose data-testid="on-close" onClick={onClose} />}

        <Stack
          gap={4}
          width={'100%'}
          flex={1}
          sx={{ paddingTop: paddingTop, px: 2, mt: marginTop, mb: marginBottom }}
        >
          <Stack gap={2} marginRight={marginRight} flex={1}>
            <Stack direction={direction} alignItems={alignement} gap={size === 'sm' ? 2 : 3}>
              {icon && (
                <AspectRatio variant="plain" ratio={1} sx={{ m: 0, width: '60px' }}>
                  {icon}
                </AspectRatio>
              )}

              <Stack gap={0.5} justifyContent={'center'}>
                {title && (
                  <Typography
                    color={color}
                    level="title-md"
                    width={'100%'}
                    textAlign={alignement}
                    whiteSpace={'pre-wrap'}
                  >
                    {title}
                  </Typography>
                )}

                {description && (
                  <Typography
                    color={color}
                    level="body-sm"
                    textColor={color ?? 'text.tertiary'}
                    textAlign={alignement}
                  >
                    {description}
                  </Typography>
                )}
              </Stack>
            </Stack>
            {children && <Stack>{children}</Stack>}
          </Stack>

          {(onCancel || onConfirm) && (
            <Stack
              direction={actionsButtonDirection}
              justifyContent={alignement ?? 'flex-end'}
              mt={2}
              gap={1}
            >
              {onCancel && (
                <Button
                  data-testid="on-cancel"
                  variant="soft"
                  color="neutral"
                  onClick={onCancel}
                  sx={{ flex: '1' }}
                >
                  {cancelLabel}
                </Button>
              )}
              {onConfirm && (
                <Button
                  data-testid="on-confirm"
                  color={color}
                  sx={{ flex: '1' }}
                  onClick={onConfirm}
                >
                  {okLabel}
                </Button>
              )}
            </Stack>
          )}
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
