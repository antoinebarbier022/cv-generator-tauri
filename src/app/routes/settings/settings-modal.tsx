import {
  BrushRounded,
  LaptopChromebookRounded,
  PublicRounded,
  SettingsRounded,
  TuneRounded
} from '@mui/icons-material'
import {
  Card,
  Divider,
  Input,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Switch,
  Typography
} from '@mui/joy'

interface Props {
  open: boolean
  onClose: () => void
}

export const SettingsModal = (props: Props) => {
  //const searchParams = useSearchParams()
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
          minHeight: '80vh'
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

          <Stack mt={5} px={5} gap={2}>
            <Typography level="title-md">Traduction</Typography>
            <Stack direction={'row'} justifyContent={'space-between'} gap={2}>
              <Stack>
                <Typography>Activer la super feature de traduction payée par Pazu</Typography>
                <Typography level="body-xs" fontWeight={400} textColor={'text.tertiary'}>
                  Activer la super feature de traduction payée par Pazu
                </Typography>
              </Stack>

              <Switch size="lg"></Switch>
            </Stack>

            <Divider />

            <Stack direction={'row'} justifyContent={'space-between'} gap={2}>
              <Typography flex={2}>API KEY</Typography>
              <Input size="sm" placeholder="Deepl API KEY" sx={{ width: '100px' }}></Input>
            </Stack>

            <Card variant="outlined">
              <Typography>Limitation de l'usage de l'API DeepL (free)</Typography>
              <Stack gap={1} mb={1}>
                <Typography level="body-xs" color="primary" sx={{ alignSelf: 'end' }}>
                  1% utilisé
                </Typography>
                <LinearProgress determinate value={25} />
                <Typography level="body-xs" fontWeight={400} textColor={'text.tertiary'}>
                  499,855 free characters left
                </Typography>
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
