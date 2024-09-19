import { SettingsItem } from '@/common/settings/settings-item'
import { SettingsSection } from '@/common/settings/settings-section'
import { Option, Select } from '@mui/joy'
import { useTranslation } from 'react-i18next'
import { useAppTheme } from '../../../hooks/useAppTheme'

export const ThemesSettings = () => {
  const { t } = useTranslation()
  const { appTheme, overrideAppTheme, setOverrideAppTheme, setAppTheme, allTheme } = useAppTheme()
  return (
    <SettingsSection>
      <SettingsItem
        title={t('settings.theme.title')}
        description={<>{t('settings.theme.description')}</>}
        endAction={
          <Select
            size="sm"
            sx={{ minWidth: '160px' }}
            value={overrideAppTheme || appTheme}
            onChange={(_, value) => {
              if (overrideAppTheme) {
                setOverrideAppTheme(value)
              }
              setAppTheme(value)
              console.info(`User changed theme to '${value}'`)
            }}
          >
            {allTheme.map(
              (theme) =>
                !theme.hide && (
                  <Option key={theme.value} value={theme.value}>
                    {theme.label}
                  </Option>
                )
            )}
          </Select>
        }
      />
    </SettingsSection>
  )
}
