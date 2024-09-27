import { locales } from '@/configs/i18n.config'
import { emitApplicationEvents } from '@/core/events/emit-application-events'
import { SettingsItem } from '@/features/settings/settings-item'
import { SettingsSection } from '@/features/settings/settings-section'
import { useUpdateInfoStore } from '@/features/updater/stores/useUpdateInfoStore'
import { useUpdateSettingsStore } from '@/features/updater/stores/useUpdateSettingsStore'

import { Button, Divider, Option, Select } from '@mui/joy'
import { formatDistanceToNow } from 'date-fns'
import { useTranslation } from 'react-i18next'

export const ApplicationSettings = () => {
  const { t, i18n } = useTranslation()

  const { currentVersion } = useUpdateInfoStore()
  const { lastCheck } = useUpdateSettingsStore()

  return (
    <SettingsSection>
      <SettingsItem
        title={t('settings.app.check-for-updates.title', {
          currentVersion
        })}
        description={
          <>
            {t('settings.app.check-for-updates.description.is-up-to-date', {
              lastCheckDate:
                lastCheck &&
                formatDistanceToNow(lastCheck, {
                  addSuffix: true,
                  locale: locales[i18n.languages[0]]
                })
            })}
          </>
        }
        endAction={
          <Button
            sx={{ whiteSpace: { md: 'nowrap' } }}
            onClick={() =>
              emitApplicationEvents.checkForUpdates({
                open_modal_before_check: true,
                open_modal_after_check: false
              })
            }
          >
            {t('settings.app.check-for-updates.cta.check-for-updates')}
          </Button>
        }
      />

      <Divider />
      <SettingsItem
        title={t('settings.language.title')}
        description={<>{t('settings.language.description')}</>}
        endAction={
          <Select
            size="sm"
            defaultValue={i18n.languages[0]}
            onChange={(_, value) => {
              if (value) {
                i18n.changeLanguage(value)
                console.info(`User changed language to '${value}'`)
              }
            }}
          >
            <Option value="en">English</Option>
            <Option value="fr">Français</Option>
          </Select>
        }
      />
    </SettingsSection>
  )
}
