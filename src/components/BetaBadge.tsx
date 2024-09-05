import { Stack, Typography } from '@mui/joy'

export const BetaBadge = () => {
  return (
    <Stack
      sx={{
        width: '100px',
        height: '100px',
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 10,
        rotate: '45deg',
        userSelect: 'none'
      }}
    >
      <Typography
        level="body-sm"
        textColor="common.white"
        fontWeight="bold"
        sx={{
          backgroundColor: 'warning.500',
          paddingX: 4
        }}
      >
        {import.meta.env.DEV ? 'DEV' : 'BETA'}
      </Typography>
    </Stack>
  )
}
