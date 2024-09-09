import { TranslateRounded } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/joy'

interface Props {
  onClick?: () => void
}
export const TranslateButton = (props: Props) => {
  return (
    <Tooltip arrow size="sm" enterDelay={1500} variant="outlined" title="Traduire avec DeepL">
      <Button
        size="sm"
        color="primary"
        variant="solid"
        sx={{ '--IconButton-size': '1.5rem', fontSize: '0.75rem', px: 1.5 }}
        onClick={props.onClick}
      >
        <TranslateRounded sx={{ fontSize: '0.85rem' }} />
      </Button>
    </Tooltip>
  )
}
