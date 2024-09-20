import { Stack, Typography } from '@mui/joy'
import { ReactNode } from 'react'

interface Props {
  title: string
  description: ReactNode
  endAction: ReactNode
}
export const SettingsItem = (props: Props) => {
  return (
    <Stack direction={'row'} justifyContent={'space-between'} gap={2}>
      <Stack gap={0.5} width={'100%'}>
        <Typography>{props.title}</Typography>
        <Typography level="body-xs" fontWeight={300} textColor={'text.tertiary'} width={'80%'}>
          {props.description}
        </Typography>
      </Stack>
      <Stack direction={'row'} alignItems={'center'}>
        {props.endAction}
      </Stack>
    </Stack>
  )
}
