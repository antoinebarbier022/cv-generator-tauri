import { UpdateRounded } from '@mui/icons-material'
import { Stack, Typography } from '@mui/joy'
import { format } from 'date-fns'

interface Props {
  date: Date
}
export const FooterItemLastUpdated = ({ date }: Props) => {
  return (
    <Typography
      sx={{
        py: 0.5,
        px: 1
      }}
      startDecorator={
        <Stack fontSize={'16px'}>
          <UpdateRounded fontSize="inherit" />
        </Stack>
      }
    >
      {format(date, "dd/MM/yyyy 'à' HH:mm")}
    </Typography>
  )
}
