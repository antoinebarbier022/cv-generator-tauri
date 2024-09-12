import { useAppTheme } from '@/features/themes/hooks/useAppTheme'
import { BrushRounded } from '@mui/icons-material'
import { FooterItem } from './footer-item'

interface Props {}
export const FooterItemTheme = ({}: Props) => {
  const { appTheme } = useAppTheme()

  return (
    <FooterItem
      icon={<BrushRounded fontSize="inherit" />}
      isOpenModalRouter
      to={'/settings/themes'}
    >
      Thème: {appTheme}
    </FooterItem>
  )
}
