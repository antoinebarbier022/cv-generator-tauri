import { TranslatorSettings } from '@/features/translators/containers/translator-settings'
import {
  BrushRounded,
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

interface Props {
  open: boolean
  onClose: () => void
}

export const SettingsModal = (props: Props) => {
  const menu = [
    { label: 'Général', to: 'general', icon: <SettingsRounded />, disabled: false },

    { divider: true },
    { label: 'Langue', to: 'language', icon: <PublicRounded />, disabled: true },
    { label: 'Thèmes', to: 'themes', icon: <BrushRounded />, disabled: true },

    { divider: true },
    { label: 'CV Configuration', icon: <LaptopChromebookRounded />, disabled: true },
    { label: 'Avancé', to: 'advanced', icon: <TuneRounded />, disabled: true }
  ]
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ModalDialog
        size="sm"
        sx={{
          p: 0,
          minWidth: { sm: '80vw', lg: '80vw', overflow: 'hidden' },
          maxWidth: { sm: '80vw' },
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
              {menu.map((value, index) => {
                if (value.divider) {
                  return <Divider sx={{ my: 1 }} />
                }
                return (
                  <ListItem>
                    <ListItemButton
                      selected={index === 1}
                      variant="soft"
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
          <Stack sx={{ height: '100%', overflowY: 'scroll' }}>
            <TranslatorSettings />
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
