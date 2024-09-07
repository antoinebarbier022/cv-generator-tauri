import { Button, Chip, Input, Stack, Textarea, Typography } from '@mui/joy'
import { UUID } from 'crypto'
import { useFormik } from 'formik'
import debounce from 'just-debounce-it'
import { Fragment, useCallback } from 'react'

import { ResumeContentSection, Translation } from '../../../types/storage'

import * as yup from 'yup'
import { AccordionCardTitle } from '../../../components/accordion-card-title'
import { CV_LANGUAGES } from '../../../constants/cv-languages'

import { TranslateRounded } from '@mui/icons-material'
import { useExpandedItemStore } from '../../../stores/useExpandedItemStore'
import { translationSchemaWithValidation } from '../../../validations/dataContentValidationSchema'
import { SectionItemLayout, SectionItemProps } from '../layouts/section-item-layout'

interface Props extends Omit<SectionItemProps, 'title' | 'isExpanded' | 'onExpandedChange'> {
  id: UUID
  maxWarningLength?: number
  titlePlaceholder?: string
  content: Translation
  inputPlaceholder: string
  inputType?: 'input' | 'textarea'
  onChange: (values: ResumeContentSection<Translation>) => void
}

export const SectionItem = ({
  id,
  inputType = 'input',
  titlePlaceholder,
  maxWarningLength,
  content,
  inputPlaceholder,
  onChange,
  ...rest
}: Props) => {
  const initialValues = {
    id,
    content: content,
    isHidden: rest.isVisible
  }

  const validationSchema = yup.object().shape({
    id: yup.string().required(),
    content: translationSchemaWithValidation,
    isHidden: yup.boolean()
  })

  const formik = useFormik<ResumeContentSection<Translation>>({
    initialValues: initialValues,
    onSubmit: (values) => {
      formikOnlyWarning.setValues(values)
      onChange(values)
    }
  })

  // this formik is just to have the validations errors
  // It's not possible to submit a formik form with errors, so to have warning
  // we need this form
  const formikOnlyWarning = useFormik<ResumeContentSection<Translation>>({
    initialValues: initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: () => {}
  })

  const { expandedItem, setExpandedItem } = useExpandedItemStore()

  const debouncedSubmit = useCallback(
    debounce(() => formik.submitForm(), 500),
    [formik.submitForm]
  )

  return (
    <SectionItemLayout
      title={
        <AccordionCardTitle
          isWarningIcon={Boolean(formikOnlyWarning.errors.content)}
          warningTitle={String(formikOnlyWarning.errors.content)}
          content={
            Boolean(formik.values.content.fr) ? formik.values.content.fr : formik.values.content.en
          }
          placeholder={titlePlaceholder}
        />
      }
      isExpanded={id === expandedItem}
      onExpandedChange={(_, expanded) => {
        setExpandedItem(expanded ? formik.values.id : undefined)
      }}
      {...rest}
    >
      <Stack flex={1} gap={1} marginTop={1} paddingBottom={1}>
        {CV_LANGUAGES.map((lang, index) => (
          <Fragment key={`content.${lang}`}>
            {inputType === 'input' && (
              <Input
                name={`content.${lang}`}
                className="group"
                startDecorator={
                  <Chip
                    sx={{
                      marginLeft: -0.75
                    }}
                  >
                    {lang}
                  </Chip>
                }
                endDecorator={
                  <Stack
                    sx={{ display: index >= 1 ? 'inline-block' : 'none' }}
                    className="invisible group-focus-within:visible hover:visible"
                  >
                    <Button
                      size="sm"
                      color="neutral"
                      variant="soft"
                      sx={{ '--IconButton-size': '1.5rem', fontSize: '0.75rem', px: 1.5 }}
                    >
                      Traduire
                      <TranslateRounded sx={{ display: 'none', fontSize: '0.85rem' }} />
                    </Button>
                  </Stack>
                }
                value={formik.values.content[lang]}
                onChange={(e) => {
                  formik.handleChange(e)
                  debouncedSubmit()
                }}
                placeholder={inputPlaceholder}
              />
            )}
            {inputType === 'textarea' && (
              <Stack>
                <Textarea
                  name={`content.${lang}`}
                  startDecorator={<Chip>{lang}</Chip>}
                  value={formik.values.content[lang]}
                  minRows={2}
                  maxRows={5}
                  onChange={(e) => {
                    formik.handleChange(e)
                    debouncedSubmit()
                  }}
                  placeholder={inputPlaceholder}
                  slotProps={{
                    endDecorator: {
                      sx: {
                        alignSelf: 'flex-end'
                      }
                    }
                  }}
                  endDecorator={
                    maxWarningLength && (
                      <Typography
                        level="body-xs"
                        textColor={'neutral.500'}
                        sx={{
                          ml: 'auto'
                        }}
                      >
                        <Typography
                          textColor={
                            content[lang].length > maxWarningLength ? 'danger.400' : 'neutral.400'
                          }
                        >
                          {content[lang].length}
                        </Typography>{' '}
                        / {maxWarningLength}
                      </Typography>
                    )
                  }
                />
              </Stack>
            )}
          </Fragment>
        ))}
      </Stack>
    </SectionItemLayout>
  )
}
