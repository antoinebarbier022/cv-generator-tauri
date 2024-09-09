import { TranslateRounded } from '@mui/icons-material'
import { Stack, Typography } from '@mui/joy'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  isActive: boolean
}
export const FooterItemOptionTranslate = ({ isActive }: Props) => {
  const routerLocation = useLocation()

  return (
    <Typography
      component={Link}
      textColor={'text.secondary'}
      sx={{
        py: 0.5,
        px: 1,
        textDecoration: 'none',
        '&:hover': {
          backgroundColor: 'primary.700'
        }
      }}
      state={{
        background: { ...routerLocation, pathname: location.pathname }
      }}
      to={'/settings'}
      startDecorator={
        <Stack fontSize={'1rem'}>
          <TranslateRounded fontSize="inherit" />
        </Stack>
      }
    >
      Option de traduction: {isActive ? 'activée' : 'désactivée'}
    </Typography>
  )
}
