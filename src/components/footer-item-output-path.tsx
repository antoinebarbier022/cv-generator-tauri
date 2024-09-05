import { Typography } from '@mui/joy'

interface Props {
  path: string
}
export const FooterItemOutputPath = ({ path }: Props) => {
  return <Typography>{path}</Typography>
}
