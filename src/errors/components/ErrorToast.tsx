import { ErrorContent } from '@/generated/errors/types/errors'
import { Sheet, Stack, Typography } from '@mui/joy'

export const ErrorToast = ({ error: { title, message } }: { error: ErrorContent }) => (
  <Stack
    component={Sheet}
    invertedColors
    variant="solid"
    color="danger"
    sx={{ background: 'none' }}
  >
    <Typography level="title-md">{title}</Typography>
    <Typography level="body-xs" color="danger">
      {message}
    </Typography>
  </Stack>
)
