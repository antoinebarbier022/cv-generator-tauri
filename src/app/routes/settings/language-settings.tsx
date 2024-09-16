import { SettingsItem } from '@/common/settings/settings-item'
import { SettingsSection } from '@/common/settings/settings-section'
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
              value && i18n.changeLanguage(value)
            }}
          >
            <Option value="en">{t('core.language.en.label')}</Option>
            <Option value="fr">{t('core.language.fr.label')}</Option>
          </Select>
        }
      />
    </SettingsSection>
  )
}
