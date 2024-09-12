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
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

interface Props {
  open: boolean
  onClose: () => void
}

export const SettingsModal = (props: Props) => {
  const routerLocation = useLocation()
  const navigate = useNavigate()
  const menu = [
    { label: 'Général', to: '/settings/general', icon: <SettingsRounded />, disabled: false },

    { divider: true },
    { label: 'Langue', to: '/settings/language', icon: <PublicRounded />, disabled: true },
    { label: 'Thèmes', to: '/settings/themes', icon: <BrushRounded />, disabled: false },

    { divider: true },
    { label: 'CV Configuration', icon: <LaptopChromebookRounded />, disabled: true },
    { label: 'Avancé', to: '/settings/advanced', icon: <TuneRounded />, disabled: true }
  ]

  const background = routerLocation.state && routerLocation.state.background

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
                if (value.divider) {
                  return <Divider sx={{ my: 1 }} />
                }
                return (
                  <ListItem>
                    <ListItemButton
                      selected={value.to === location.pathname}
                      variant={value.to === location.pathname ? 'solid' : undefined}
                      color={value.to === location.pathname ? 'primary' : undefined}
                      onClick={() =>
                        value.to &&
                        navigate(value.to, {
                          state: {
                            background
                          }
                        })
                      }
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
            <Outlet />
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
