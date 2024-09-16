import { Card, LinearProgress, Stack, Typography } from '@mui/joy'
import { useTranslation } from 'react-i18next'

interface Props {
  title: string
  description: string
  valueProgression: number
  free_character_left_count: number
}
export const TranslatorUsage = (props: Props) => {
  const { t } = useTranslation()
  return (
    <Card variant="soft" sx={{ backgroundColor: 'neutral.50' }}>
      <Stack gap={0.5}>
        <Typography>{props.title}</Typography>
        <Typography level="body-xs" fontWeight={300}>
          {props.description}
        </Typography>
      </Stack>

      <Stack gap={1} mb={1}>
        <Typography level="body-xs" color="primary" sx={{ alignSelf: 'end' }}>
          {props.valueProgression.toFixed(4)}%
        </Typography>
        <LinearProgress
          variant="soft"
          sx={{
            '--LinearProgress-thickness': '16px',
            '--LinearProgress-progressThickness': '12px',
            '--LinearProgress-radius': '4px',
            backgroundColor: 'common.white',
            border: '1px solid',
            borderColor: 'neutral.100'
          }}
          size="lg"
          determinate
          value={Math.ceil(props.valueProgression)}
        />
        <Typography level="body-xs" fontWeight={300} textColor={'primary.500'}>
          {t('settings.option-translate.deepl.api-usage.char-count-left', {
            value: props.free_character_left_count.toLocaleString('fr')
          })}
        </Typography>
      </Stack>
    </Card>
  )
}
