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
          px: 1,
          userSelect: 'none'
        }}
        paddingRight={0.25}
        startDecorator={
          <Stack fontSize={'1rem'}>
            <WarningRounded fontSize="inherit" />
          </Stack>
        }
      >
        <span className="flex items-center text-center  w-[2ch]">
          {loading ? (
            <CircularProgress
              sx={{
                '--CircularProgress-size': '12px',
                '--CircularProgress-trackThickness': '2px',
                '--CircularProgress-progressThickness': '2px'
              }}
            />
          ) : (
            count
          )}
        </span>
      </Typography>
    </Tooltip>
  )
}
