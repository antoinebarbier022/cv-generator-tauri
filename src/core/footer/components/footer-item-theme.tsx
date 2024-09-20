import { useAppTheme } from '@/shared/hooks/useAppTheme'
import { BrushRounded } from '@mui/icons-material'
import { t } from 'i18next'
import { FooterItem } from './footer-item'

export const FooterItemTheme = () => {
  const { appTheme, overrideAppTheme } = useAppTheme()

  return (
    <FooterItem icon={<BrushRounded fontSize="inherit" />} isOpenModalRouter to={'settings-themes'}>
      {t('footer.theme', { state: overrideAppTheme || appTheme })}
    </FooterItem>
  )
}
