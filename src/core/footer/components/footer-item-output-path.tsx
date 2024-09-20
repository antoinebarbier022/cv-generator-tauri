import { Typography } from '@mui/joy'

interface Props {
  path: string
}
export const FooterItemOutputPath = ({ path }: Props) => {
  return (
    <Typography
      sx={{
        py: 0.5,
        px: 1,
        userSelect: 'none'
      }}
    >
      {path}
    </Typography>
  )
}
