import { Alert, Divider, Modal, ModalClose, ModalDialog, Stack, Typography } from '@mui/joy'
import { MarkdownWrapper } from './markdown-wrapper'

interface Props {
  open: boolean
  onClose: () => void
}
export const MissingFontModal = (props: Props) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ModalDialog sx={{ minWidth: { sm: '640px', lg: '60vw' }, maxWidth: { sm: '80vw' } }}>
        <ModalClose />
        <Typography level="title-lg">Police d'écriture manquante</Typography>
        <Divider />

        <Stack gap={2}>
          <Alert>
            <Typography level="body-sm" fontWeight={'400'}>
              Pour générer votre CV au format PowerPoint, la police{' '}
              <Typography fontWeight={'bold'}>BentonSansF</Typography> est requise.
            </Typography>
          </Alert>
          <Stack mx={2} gap={0.5} sx={{ mr: 4 }}>
            <MarkdownWrapper
              content={`

## Etape 1 : Téléchargement

Pour obtenir la police d'écriture, rendez-vous sur [https://visualidentity.capgemini.com/](https://visualidentity.capgemini.com/frog-brand/brand-foundation/resources-downloads/) et téléchargez-la.

## Etape 2 : Installation

- Ouvrez l'application **"Livre des polices"** sur votre Mac.
- Glisser et déposez le dossier de la police d'écriture dans la fenêtre de l'application **"Livre des polices"**.`}
            ></MarkdownWrapper>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
