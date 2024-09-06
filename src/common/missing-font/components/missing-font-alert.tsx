import { WarningRounded } from '@mui/icons-material'
import { Alert, Link, Typography } from '@mui/joy'

interface Props {
  onClick?: () => void
}
export const MissingFontAlert = (props: Props) => {
  return (
    <Alert
      variant="outlined"
      startDecorator={<WarningRounded />}
      sx={{ mx: 0, backdropFilter: 'blur(16px)' }}
    >
      <Typography textColor={'common.white'} fontWeight={'400'} level="body-xs">
        Police d'écriture manquante.
        <Link onClick={props.onClick}>En savoir plus</Link>
      </Typography>
    </Alert>
  )
}
