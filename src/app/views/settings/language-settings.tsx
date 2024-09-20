import { SettingsItem } from '@/features/settings/settings-item'
import { SettingsSection } from '@/features/settings/settings-section'
import { Option, Select } from '@mui/joy'
import { useTranslation } from 'react-i18next'

export const LanguageSettings = () => {
  const { t, i18n } = useTranslation()
  return (
    <SettingsSection>
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
            <Option value="ja">日本語</Option>
          </Select>
        }
      />
    </SettingsSection>
  )
}
