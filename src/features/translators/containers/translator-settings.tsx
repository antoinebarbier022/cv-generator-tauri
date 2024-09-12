import { SettingsItem } from '@/common/settings/settings-item'
import { SettingsSection } from '@/common/settings/settings-section'
import { ErrorRounded } from '@mui/icons-material'
import { Alert, Divider, Link, Stack, Switch, Typography } from '@mui/joy'

import { ChangeEventHandler } from 'react'
import { TranslatorApiKey } from '../components/translator-api-key'
import { TranslatorUsage } from '../components/translator-usage'
import { useTranslatorApiKey } from '../hooks/useTranslatorApiKey'
import { useTranslatorOption } from '../hooks/useTranslatorOption'
import { useTranslatorUsage } from '../hooks/useTranslatorUsage'

export const TranslatorSettings = () => {
  const { isActiveOption, setOptionActivation } = useTranslatorOption()

  const { apiKey, displayAPIKey, mutation, handleRemoveApiKey, handleSaveApiKey } =
    useTranslatorApiKey()
  const { usage, free_character_left_count, usageProgression } = useTranslatorUsage({
    api_key: apiKey
  })

  const handleChangeOptionActivation: ChangeEventHandler<HTMLInputElement> | undefined = (e) =>
    setOptionActivation(e.target.checked)

  return (
    <SettingsSection>
      {/*<SettingsTitle>Option de traduction</SettingsTitle>*/}

      <SettingsItem
        title="Traduction avec DeepL"
        description={
          <>
            Activez cette option pour permettre la traduction via DeepL. Un bouton "Traduire"
            apparaîtra à côté des champs à traduire.
          </>
        }
        endAction={
          <Switch
            size="lg"
            checked={isActiveOption}
            onChange={handleChangeOptionActivation}
          ></Switch>
        }
      />

      {isActiveOption && (
        <>
          <Divider />
          <Stack gap={2}>
            <SettingsItem
              title={"Clé d'API DeepL"}
              description={
                <Typography>
                  Une clé API est nécessaire pour utiliser la fonctionnalité de traduction. Vous
                  pouvez souscrire à différents plans en fonction de vos besoins sur le site de
                  DeepL. Un plan gratuit vous offre jusqu'à 500 000 caractères à traduire par mois.
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
              }
              endAction={undefined}
            />

            <TranslatorApiKey
              isActive={Boolean(apiKey)}
              isLoading={mutation.isPending}
              isError={mutation.isError}
              apiKeyToShow={displayAPIKey}
              onSubmit={(value) => handleSaveApiKey(value)}
              onDelete={handleRemoveApiKey}
            />
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
            {usage.data && apiKey && !mutation.isError && (
              <Stack gap={2}>
                <TranslatorUsage
                  title={"Suivi de l'usage"}
                  description={`Limitation à ${usage.data.character_limit.toLocaleString(
                    'fr'
                  )} caractères par
                      mois`}
                  valueProgression={usageProgression}
                  free_character_left_count={free_character_left_count}
                />
              </Stack>
            )}
          </Stack>
        </>
      )}
    </SettingsSection>
  )
}
