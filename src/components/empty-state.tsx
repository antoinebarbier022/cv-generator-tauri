import { AddRounded } from '@mui/icons-material'
import { Button, Container, Stack, Typography } from '@mui/joy'

interface Props {
  title: string
  description: string
  labelButton: string
  onClickButton: () => void
}
export const EmptyState = (props: Props) => {
  return (
    <Stack component={Container} maxWidth={'sm'} textAlign={'center'} marginTop={2}>
      <Typography level="title-md" textColor={'text.secondary'}>
        {props.title}
      </Typography>
      <Typography level="body-sm" textColor={'text.tertiary'}>
        {props.description}
      </Typography>
      <Stack justifyContent={'center'} alignItems={'center'} marginTop={2}>
        <Button
          size="sm"
          variant="soft"
          color="neutral"
          startDecorator={<AddRounded />}
          onClick={props.onClickButton}
        >
          {props.labelButton}
        </Button>
      </Stack>
    </Stack>
  )
}
