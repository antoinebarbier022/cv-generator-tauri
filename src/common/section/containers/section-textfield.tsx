import { TranslateButton } from '@/features/translators/components/translate-button'
import { Chip, Input, Stack } from '@mui/joy'
import { ChangeEventHandler } from 'react'

export interface SectionTextfieldProps {
  name?: string
  variant?: 'outlined' | 'solid' | 'plain' | 'soft'
  value?: string | readonly string[] | undefined
  lang?: string
  isTranslateOption?: boolean
  placeholder?: string | undefined
  onTranslate?: () => void
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}
export const SectionTextfield = (props: SectionTextfieldProps) => {
  return (
    <Input
      variant={props.variant}
      name={props.name}
      className="group"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      startDecorator={
        props.lang && (
          <Chip
            sx={{
              marginLeft: -0.75
            }}
          >
            {props.lang}
          </Chip>
        )
      }
      endDecorator={
        <>
          <Stack
            sx={{ display: props.isTranslateOption ? 'inline-block' : 'none' }}
            className="invisible group-focus-within:visible hover:visible"
          >
            <TranslateButton onClick={props.onTranslate} />
          </Stack>
        </>
      }
    />
  )
}
