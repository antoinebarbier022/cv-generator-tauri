import { CloseRounded } from '@mui/icons-material'
import { IconButton, Link, Stack, Typography } from '@mui/joy'
import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  filename: string
  onOpenFinder: MouseEventHandler<HTMLAnchorElement> | undefined
  onClose?: MouseEventHandler<HTMLAnchorElement> | undefined
}

export const ToastGenerationSuccess = ({ filename, onOpenFinder, onClose }: Props) => {
  const { t } = useTranslation()
  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
      <Stack>
        <Typography textColor={'text.primary'}>{filename}</Typography>
        <Stack direction={'column-reverse'}>
          <Link
            className="peer"
            mt={1}
            sx={{ width: 'fit-content' }}
            fontSize={'0.75rem'}
            onClick={onOpenFinder}
          >
            {t('display-inside-finder')}
          </Link>
          <Typography
            className="group-hover:hidden peer-hover:flex group-has-[.close:hover]:flex"
            sx={{ width: 'fit-content' }}
            fontSize={'0.75rem'}
          >
            PPTX
          </Typography>

          <Typography
            sx={{ width: 'fit-content', display: 'none' }}
            className="group-hover:flex peer-hover:hidden group-has-[.close:hover]:hidden"
            fontSize={'0.75rem'}
          >
            {t('open-inside-powerpoint')}
          </Typography>
        </Stack>
      </Stack>
      <IconButton size="sm" className="close" onClick={onClose}>
        <CloseRounded />
      </IconButton>
    </Stack>
  )
}
