import { useAppTheme } from '@/hooks/useAppTheme'
import { BrushRounded } from '@mui/icons-material'
import { t } from 'i18next'
import { FooterItem } from './footer-item'

interface Props {}
export const FooterItemTheme = ({}: Props) => {
  const { appTheme, overrideAppTheme } = useAppTheme()

  return (
    <FooterItem icon={<BrushRounded fontSize="inherit" />} isOpenModalRouter to={'settings-themes'}>
      {t('footer.theme', { state: overrideAppTheme || appTheme })}
    </FooterItem>
  )
}
