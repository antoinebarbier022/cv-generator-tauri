import { TranslateRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { FooterItem } from './footer-item'

interface Props {
  isActive: boolean
}
export const FooterItemOptionTranslate = ({ isActive }: Props) => {
  const { t } = useTranslation()
  return (
    <FooterItem icon={<TranslateRounded fontSize="inherit" />} isOpenModalRouter to={'/settings'}>
      {t('footer.option-translate', { state: isActive ? t('core.enabled') : t('core.disabled') })}
    </FooterItem>
  )
}
