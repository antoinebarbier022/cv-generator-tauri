import { Alert, Divider, Modal, ModalClose, ModalDialog, Stack, Typography } from '@mui/joy'
import { useTranslation } from 'react-i18next'
import { MarkdownWrapper } from '../../../components/markdown-wrapper'

interface Props {
  open: boolean
  onClose: () => void
}
export const MissingFontModal = (props: Props) => {
  const { t } = useTranslation()
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ModalDialog
        sx={{ minWidth: { sm: '80vw', lg: '800px' }, maxWidth: { sm: '80vw', lg: '800px' } }}
      >
        <ModalClose />

        <Typography level="title-lg">{t('missing-font.modal.title')}</Typography>
        <Divider />

        <Stack gap={2}>
          <Alert>
            <MarkdownWrapper
              level="body-sm"
              paragraphSpace={0}
              content={t('missing-font.modal.description', { font: 'BentonSansF' })}
            />
          </Alert>
          <Stack mx={2} gap={0.5} sx={{ mr: 4 }}>
            <MarkdownWrapper content={t('missing-font.modal.content')}></MarkdownWrapper>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
