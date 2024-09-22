import { WarningRounded } from '@mui/icons-material'
import { Alert, Link, Typography } from '@mui/joy'
import { useTranslation } from 'react-i18next'

interface Props {
  onClick?: () => void
}
export const MissingFontAlert = (props: Props) => {
  const { t } = useTranslation()
  return (
    <Alert
      variant="outlined"
      startDecorator={<WarningRounded />}
      sx={{ mx: 0, backdropFilter: 'blur(16px)' }}
    >
      <Typography textColor={'common.white'} fontWeight={'400'} level="body-xs">
        {t('missing-font.alert.title')}

        <Link onClick={props.onClick}>{t('missing-font.alert.see-more')}</Link>
      </Typography>
    </Alert>
  )
}
