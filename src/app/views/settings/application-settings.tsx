import { locales } from '@/configs/i18n.config'
import { SettingsItem } from '@/features/settings/settings-item'
import { SettingsSection } from '@/features/settings/settings-section'
import { useUpdater } from '@/features/updater/hooks/useAppUpdater'
import { MenuEvent } from '@/generated/events/menu-events'
import { Button, Divider, Option, Select } from '@mui/joy'
import { emit } from '@tauri-apps/api/event'
import { formatDistanceToNow } from 'date-fns'
import { useTranslation } from 'react-i18next'

export const ApplicationSettings = () => {
  const { t, i18n } = useTranslation()
  const { currentVersion, lastCheck } = useUpdater()

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
            onClick={() => emit(MenuEvent.AppCheckUpdate)}
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
