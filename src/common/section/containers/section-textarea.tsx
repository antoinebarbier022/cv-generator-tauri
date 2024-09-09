import { TranslateButton } from '@/features/translators/components/translate-button'
import { Chip, Stack, Textarea, Typography } from '@mui/joy'
import { ChangeEventHandler } from 'react'
import { SectionTextfieldProps } from './section-textfield'

interface Props extends Omit<SectionTextfieldProps, 'onChange'> {
  maxWarningLength?: number | undefined
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined
}
export const SectionTextarea = (props: Props) => {
  return (
    <Textarea
      name={props.name}
      className="group"
      startDecorator={<Chip>{props.lang}</Chip>}
      value={props.value}
      minRows={3}
      maxRows={5}
      onChange={props.onChange}
      placeholder={props.placeholder}
      slotProps={{
        endDecorator: {
          sx: {
            height: '100%',
            alignSelf: 'flex-end'
          }
        }
      }}
      endDecorator={
        <Stack
          direction={'column'}
          justifyContent={'space-between'}
          alignItems={'flex-end'}
          gap={1}
          alignContent={'space-between'}
        >
          <Stack className="invisible group-focus-within:visible hover:visible">
            {props.isTranslateOption && <TranslateButton onClick={props.onTranslate} />}
          </Stack>
          {props.maxWarningLength && (
            <Typography
              level="body-xs"
              textColor={'neutral.500'}
              sx={{
                ml: 'auto'
              }}
            >
              <Typography
                textColor={
                  (props.value ?? '').length > props.maxWarningLength ? 'danger.400' : 'neutral.400'
                }
              >
                {(props.value ?? '').length}
              </Typography>{' '}
              / {props.maxWarningLength}
            </Typography>
          )}
        </Stack>
      }
    />
  )
}
