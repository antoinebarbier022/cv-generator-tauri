import { WarningRounded } from '@mui/icons-material'
import { Stack, Tooltip, Typography } from '@mui/joy'

interface Props {
  count: number
}
export const FooterItemWarningsCounter = ({ count }: Props) => {
  return (
    <Tooltip open color="warning" title="" size="sm" variant="solid" arrow>
      <Typography
        endDecorator={
          <Stack fontSize={'1rem'}>
            <WarningRounded fontSize="inherit" />
          </Stack>
        }
      >
        {count}
      </Typography>
    </Tooltip>
  )
}
