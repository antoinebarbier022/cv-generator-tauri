import { TranslateRounded } from '@mui/icons-material'
import { FooterItem } from './footer-item'

interface Props {
  isActive: boolean
}
export const FooterItemOptionTranslate = ({ isActive }: Props) => {
  return (
    <FooterItem icon={<TranslateRounded fontSize="inherit" />} isOpenModalRouter to={'/settings'}>
      Option de traduction: {isActive ? 'activée' : 'désactivée'}
    </FooterItem>
  )
}
