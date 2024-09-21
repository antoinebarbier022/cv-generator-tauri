import { Stack, Typography } from '@mui/joy'
import { PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren {
  onClick?: () => void
  icon?: ReactNode
}
export const FooterItem = ({ icon, onClick, children }: Props) => {
  return (
    <Typography
      textColor={'text.secondary'}
      sx={{
        userSelect: 'none',
        py: 0.5,
        px: 1,
        textDecoration: 'none',
        '&:hover': {
          backgroundColor: onClick && 'rgba(var(--joy-palette-primary-darkChannel) / 0.6)'
        }
      }}
      tabIndex={-1}
      onClick={onClick}
      startDecorator={icon && <Stack fontSize={'1rem'}>{icon}</Stack>}
    >
      {children}
    </Typography>
  )
}
