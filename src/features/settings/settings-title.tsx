import { Typography } from '@mui/joy'
import { PropsWithChildren } from 'react'

export const SettingsTitle = (props: PropsWithChildren) => {
  return <Typography level="title-md">{props.children}</Typography>
}
