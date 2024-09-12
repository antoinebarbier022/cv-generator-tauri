import { WarningRounded } from '@mui/icons-material'
import { CircularProgress, Stack, Tooltip, Typography } from '@mui/joy'

interface Props {
  count: number
  loading?: boolean
}
export const FooterItemWarningsCounter = ({ count, loading }: Props) => {
  return (
    <Tooltip open color="warning" title="" size="sm" variant="solid" arrow>
      <Typography
        sx={{
          py: 0.5,
          px: 1
        }}
        paddingRight={0.25}
        startDecorator={
          <Stack fontSize={'1rem'}>
            <WarningRounded fontSize="inherit" />
          </Stack>
        }
      >
        <span className="text-center w-[2ch]">
          {loading ? (
            <Stack>
              <CircularProgress size="sm" sx={{ scale: '0.5' }} />
            </Stack>
          ) : (
            count
          )}
        </span>
      </Typography>
    </Tooltip>
  )
}
