import { useNavigateToModal } from '@/hooks/useNavigateToModal'
import {
  BrushRounded,
  InfoRounded,
  LaptopChromebookRounded,
  PublicRounded,
  SettingsRounded,
  TuneRounded
} from '@mui/icons-material'
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Modal,
  ModalClose,
  ModalDialog,
  Stack
} from '@mui/joy'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

interface Props extends PropsWithChildren {
  open: boolean
  onClose: () => void
}

export const SettingsModal = (props: Props) => {
  const modal = useNavigateToModal()
  const { t } = useTranslation()

  const menu = [
    {
      label: t('settings.navigation.general'),
      to: 'settings',
      icon: <SettingsRounded />,
      disabled: false
    },
    { divider: true, hide: true },
    {
      label: t('settings.navigation.language'),
      to: 'settings-language',
      icon: <PublicRounded />
    },
    {
      label: t('settings.navigation.theme'),
      to: 'settings-themes',
      icon: <BrushRounded />,
      disabled: false
    },
    { divider: true, hide: true },
    {
      label: t('settings.navigation.cv-configuration'),
      icon: <LaptopChromebookRounded />,
      disabled: true,
      hide: true
    },
    {
      label: t('settings.navigation.advanced'),
      to: 'settings-advanced',
      icon: <TuneRounded />,
      disabled: true,
      hide: true
    },
    { divider: true, hide: true },
    {
      label: t('settings.navigation.about'),
      to: 'settings-about',
      icon: <InfoRounded />,
      disabled: true,
      hide: true
    }
  ]

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ModalDialog
        size="sm"
        sx={{
          p: 0,
          minWidth: { sm: '80vw', xl: '1400px', overflow: 'hidden' },
          maxWidth: { sm: '80vw', xl: '1400px' },
          minHeight: '80vh',
          maxHeight: '80vh'
        }}
      >
        <ModalClose />
        <Stack direction={'row'} display={'grid'} gridTemplateColumns={'230px auto'}>
          <Stack
            sx={{
              height: '100%',
              background: 'var(--joy-palette-neutral-50)',
              p: 2,
              borderRight: '1px solid var(--joy-palette-neutral-200)'
            }}
          >
            <List size="sm" sx={{ height: '100%', gap: 0.25 }}>
              {menu.map((value) => {
                if (value.hide) {
                  return
                }
                if (value.divider) {
                  return <Divider sx={{ my: 1 }} />
                }
                return (
                  <ListItem>
                    <ListItemButton
                      selected={Boolean(value.to && modal.isOpen(value.to))}
                      variant={Boolean(value.to && modal.isOpen(value.to)) ? 'solid' : undefined}
                      color={Boolean(value.to && modal.isOpen(value.to)) ? 'primary' : undefined}
                      onClick={() => {
                        value.to && modal.open(value.to)
                      }}
                      disabled={value.disabled}
                      sx={{
                        borderRadius: 'sm',
                        minHeight: '1.8rem',
                        height: '1rem'
                      }}
                    >
                      <ListItemDecorator>{value.icon}</ListItemDecorator>
                      <ListItemContent>{value.label}</ListItemContent>
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </Stack>

          <Stack sx={{ height: '100%', overflowY: 'scroll' }}>{props.children}</Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
