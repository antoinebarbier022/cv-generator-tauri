import { SettingsItem } from '@/common/settings/settings-item'
import { SettingsSection } from '@/common/settings/settings-section'
import { Option, Select } from '@mui/joy'
import { AppTheme, useAppTheme } from '../hooks/useAppTheme'

export const ThemesSettings = () => {
  const { appTheme, setAppTheme } = useAppTheme()
  return (
    <SettingsSection>
      <SettingsItem
        title="Thèmes"
        description={<>Choisissez un thème pour personnaliser l'apparence de l'application.</>}
        endAction={
          <Select
            size="sm"
            sx={{ minWidth: '160px' }}
            value={appTheme}
            onChange={(_, value) => setAppTheme(value)}
          >
            <Option value={AppTheme.FROG}>frog</Option>
            <Option value={AppTheme.CAPGEMINI}>Capgemini</Option>
            <Option value={AppTheme.DEFAULT}>Default (frog)</Option>
          </Select>
        }
      />
    </SettingsSection>
  )
}
