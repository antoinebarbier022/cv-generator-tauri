import { Stack, Typography } from '@mui/joy'
import { PropsWithChildren, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface Props extends PropsWithChildren {
  to: string
  isOpenModalRouter: boolean
  icon: ReactNode
}
export const FooterItem = ({ icon, to, isOpenModalRouter, children }: Props) => {
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
          backgroundColor: to && 'rgba(var(--joy-palette-primary-darkChannel) / 0.6)'
        }
      }}
      tabIndex={-1}
      state={
        isOpenModalRouter && {
          background: { ...routerLocation, pathname: location.pathname }
        }
      }
      to={to}
      startDecorator={icon && <Stack fontSize={'1rem'}>{icon}</Stack>}
    >
      {children}
    </Typography>
  )
}
