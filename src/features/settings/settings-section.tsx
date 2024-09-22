import { Stack } from '@mui/joy'
import { PropsWithChildren } from 'react'

export const SettingsSection = (props: PropsWithChildren) => {
  return (
    <Stack pt={5} pb={5} px={5} gap={2}>
      {props.children}
    </Stack>
  )
}
