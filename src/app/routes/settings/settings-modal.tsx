import { DeepLService } from '@/features/translators/deepl/deepl.service'
import {
  BrushRounded,
  ErrorRounded,
  LaptopChromebookRounded,
  PublicRounded,
  SettingsRounded,
  TuneRounded
} from '@mui/icons-material'
import {
  Alert,
  Button,
  Card,
  Divider,
  Input,
  LinearProgress,
  Link,
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
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

export const SettingsModal = (props: Props) => {
  const [option_translation, setOption_translation] = useState(
    localStorage.getItem('option-translation') === 'true'
  )
  const [input_deepl_key, setInputDeeplKey] = useState('')
  const [deepl_key, setDeeplKey] = useState(sessionStorage.getItem('deepl-api-key') ?? '')

  const usage = useQuery({
    queryKey: ['translators', 'deepl', 'usage'],
    queryFn: () => DeepLService.usage(deepl_key),
    retry: 0,
    enabled: !!deepl_key
  })

  const mutation = useMutation({
    mutationKey: ['translators', 'deepl', 'usage'],
    mutationFn: DeepLService.usage
  })

  const free_character_left_count = useMemo(() => {
    return (usage.data?.character_limit ?? 0) - (usage.data?.character_count ?? 0)
  }, [usage.data])

  const usageProgression = useMemo(() => {
    if (!usage.data || !usage.data?.character_limit) {
      return 0
    }

    return usage.data.character_count / usage.data.character_limit
  }, [usage.data, mutation])

  const handleSaveDeeplKey = async (value: string) => {
    mutation.mutate(value, {
      onSuccess: () => {
        setDeeplKey(value)
        setInputDeeplKey('')
        window.sessionStorage.setItem('deepl-api-key', value)
      }
    })
  }

  const handleRemoveDeeplKey = () => {
    setDeeplKey('')
    setInputDeeplKey('')
    window.sessionStorage.setItem('deepl-api-key', '')
    mutation.reset()
  }

  const displayAPIKey =
    deepl_key.length > 8 ? `${deepl_key.slice(0, 4)}****${deepl_key.slice(-4)}` : '******'
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

          <Stack
            pt={5}
            pb={5}
            px={5}
            gap={2}
            sx={{ height: '100%', overflow: 'scroll', scrollbarGutter: 'stable' }}
          >
            <Typography level="title-md">Option de traduction</Typography>
            <Stack direction={'row'} justifyContent={'space-between'} gap={2}>
              <Stack gap={0.5}>
                <Typography>Traduction automatique avec DeepL</Typography>
                <Typography
                  level="body-xs"
                  fontWeight={300}
                  textColor={'text.tertiary'}
                  width={'80%'}
                >
                  Activez cette option pour permettre la traduction automatique via DeepL. Un bouton
                  "Traduire" apparaîtra à côté des champs à traduire.
                </Typography>
              </Stack>

              <Switch
                checked={option_translation}
                onChange={(e) => {
                  localStorage.setItem('option-translation', String(e.target.checked))
                  setOption_translation(e.target.checked)
                }}
                size="lg"
              ></Switch>
            </Stack>

            {option_translation && (
              <>
                <Divider />
                <Stack gap={2}>
                  <Stack gap={0.5}>
                    <Typography>Clé d'API DeepL</Typography>
                    <Typography
                      level="body-xs"
                      fontWeight={300}
                      textColor={'text.tertiary'}
                      width={'80%'}
                    >
                      Une clé API est nécessaire pour utiliser la fonctionnalité de traduction
                      automatique. Vous pouvez souscrire à différents plans en fonction de vos
                      besoins sur le site de DeepL. Un plan gratuit vous offre jusqu'à 500 000
                      caractères à traduire par mois.
                      <br />
                      Si vous possédez déjà une clé API, vous pouvez la retrouver sur votre{' '}
                      <Link
                        level="body-xs"
                        fontWeight={400}
                        href="https://www.deepl.com/en/your-account/keys"
                        slotProps={{
                          root: {
                            target: '_blank'
                          }
                        }}
                      >
                        compte DeepL
                      </Link>
                      .
                    </Typography>
                  </Stack>

                  <Stack direction={'row'} justifyContent={'space-between'} gap={2}>
                    {deepl_key ? (
                      <Stack
                        direction={'row'}
                        gap={4}
                        flex={1}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                      >
                        <Typography sx={{ textAlign: 'end', outline: 'none', border: 'none' }}>
                          {displayAPIKey}
                        </Typography>
                        <Button size="sm" color="danger" onClick={() => handleRemoveDeeplKey()}>
                          Supprimer
                        </Button>
                      </Stack>
                    ) : (
                      <Input
                        size="sm"
                        color={mutation.isError ? 'danger' : 'neutral'}
                        placeholder="API KEY"
                        value={input_deepl_key}
                        onChange={(e) => setInputDeeplKey(e.target.value)}
                        endDecorator={
                          <Button
                            color={mutation.isError ? 'danger' : 'neutral'}
                            loading={mutation.isPending}
                            variant="soft"
                            onClick={() => handleSaveDeeplKey(input_deepl_key)}
                          >
                            OK
                          </Button>
                        }
                      />
                    )}
                  </Stack>
                </Stack>

                <Stack mt={1}>
                  {mutation.isError && (
                    <Alert
                      color="danger"
                      sx={{ fontFamily: 'monospace' }}
                      startDecorator={<ErrorRounded />}
                    >
                      {mutation.error.message}
                    </Alert>
                  )}
                  {usage.data && deepl_key && !mutation.isError && (
                    <Stack gap={2}>
                      <Alert color="primary">
                        Pour des raisons de sécurité, nous ne sauvegardons pas votre clé d'API après
                        la fermeture de l'application.
                      </Alert>

                      <Card variant="soft" sx={{ backgroundColor: 'neutral.50' }}>
                        <Stack gap={0.5}>
                          <Typography>Suivi de l'usage</Typography>
                          <Typography level="body-xs" fontWeight={300}>
                            Limitation à {usage.data.character_limit.toLocaleString('fr')}{' '}
                            caractères par mois
                          </Typography>
                        </Stack>

                        <Stack gap={1} mb={1}>
                          <Typography level="body-xs" color="primary" sx={{ alignSelf: 'end' }}>
                            {usageProgression.toFixed(4)}%
                          </Typography>
                          <LinearProgress
                            variant="soft"
                            sx={{
                              '--LinearProgress-thickness': '16px',
                              '--LinearProgress-progressThickness': '12px',
                              '--LinearProgress-radius': '4px',
                              backgroundColor: 'common.white',
                              border: '1px solid',
                              borderColor: 'neutral.100'
                            }}
                            size="lg"
                            determinate
                            value={Math.ceil(usageProgression)}
                          />
                          <Typography level="body-xs" fontWeight={300} textColor={'primary.500'}>
                            Il vous reste {free_character_left_count.toLocaleString('fr')}{' '}
                            caractères pouvant être traduits.
                          </Typography>
                        </Stack>
                      </Card>
                    </Stack>
                  )}
                </Stack>
              </>
            )}
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
