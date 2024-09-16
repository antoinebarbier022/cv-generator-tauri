import { SettingsItem } from '@/common/settings/settings-item'
import { SettingsSection } from '@/common/settings/settings-section'
import { ErrorRounded } from '@mui/icons-material'
import { Alert, Divider, Stack, Switch } from '@mui/joy'

import { MarkdownWrapper } from '@/components/markdown-wrapper'
import { TranslatorApiKey } from '@/features/translators/components/translator-api-key'
import { TranslatorUsage } from '@/features/translators/components/translator-usage'
import { useTranslatorApiKey } from '@/features/translators/hooks/useTranslatorApiKey'
import { useTranslatorOption } from '@/features/translators/hooks/useTranslatorOption'
import { useTranslatorUsage } from '@/features/translators/hooks/useTranslatorUsage'
import { ChangeEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

export const TranslatorSettings = () => {
  const { t } = useTranslation()
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
      <SettingsItem
        title={t('settings.option-translate.deepl.title')}
        description={<>{t('settings.option-translate.deepl.description')}</>}
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
              title={t('settings.option-translate.deepl.api-key.title')}
              description={
                <MarkdownWrapper
                  content={t('settings.option-translate.deepl.api-key.description')}
                />
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
                  title={t('settings.option-translate.deepl.api-usage.title')}
                  description={t('settings.option-translate.deepl.api-usage.description', {
                    limit: usage.data.character_limit.toLocaleString('fr')
                  })}
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
