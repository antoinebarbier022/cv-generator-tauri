import { useNavigateToModal } from '@/app/router/useNavigateToModal'
import { Stack, Typography } from '@mui/joy'
import { PropsWithChildren, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props extends PropsWithChildren {
  to: string
  isOpenModalRouter: boolean
  icon?: ReactNode
}
export const FooterItem = ({ icon, to, isOpenModalRouter, children }: Props) => {
  const navigate = useNavigate()
  const modal = useNavigateToModal()

  return (
    <Typography
      textColor={'text.secondary'}
      sx={{
        userSelect: 'none',
        py: 0.5,
        px: 1,
        textDecoration: 'none',
        '&:hover': {
          backgroundColor: to && 'rgba(var(--joy-palette-primary-darkChannel) / 0.6)'
        }
      }}
      tabIndex={-1}
      onClick={() => (isOpenModalRouter ? modal.open(to) : navigate(to))}
      startDecorator={icon && <Stack fontSize={'1rem'}>{icon}</Stack>}
    >
      {children}
    </Typography>
  )
}
