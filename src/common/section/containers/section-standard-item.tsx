import { Stack } from '@mui/joy'
import { UUID } from 'crypto'
import { useFormik } from 'formik'
import debounce from 'just-debounce-it'
import { Fragment, useCallback } from 'react'

import { ResumeContentSection, Translation } from '../../../types/storage'

import * as yup from 'yup'
import { AccordionCardTitle } from '../../../components/accordion-card-title'
import { CV_LANGUAGES } from '../../../constants/cv-languages'

import { DeepLService } from '@/features/translators/deepl.service'
import { useTranslatorApiKey } from '@/features/translators/hooks/useTranslatorApiKey'
import { useMutation } from '@tanstack/react-query'
import { useExpandedItemStore } from '../../../stores/useExpandedItemStore'
import { translationSchemaWithValidation } from '../../../validations/dataContentValidationSchema'
import { SectionItemLayout, SectionItemProps } from '../layouts/section-item-layout'
import { SectionTextarea } from './section-textarea'
import { SectionTextfield } from './section-textfield'

interface Props extends Omit<SectionItemProps, 'title' | 'isExpanded' | 'onExpandedChange'> {
  id: UUID
  isOptionTranslate?: boolean
  maxWarningLength?: number
  titlePlaceholder?: string
  content: Translation
  inputPlaceholder: string
  inputType?: 'input' | 'textarea'

  onChange: (values: ResumeContentSection<Translation>) => void
}

export const SectionStandardItem = ({
  id,
  inputType = 'input',
  titlePlaceholder,
  maxWarningLength,
  isOptionTranslate,
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

  const { apiKey: translatorApiKey } = useTranslatorApiKey()

  const mutation = useMutation({
    mutationKey: ['translators', 'deepl', 'usage'],
    mutationFn: DeepLService.translate
  })

  const { expandedItem, setExpandedItem } = useExpandedItemStore()

  const debouncedSubmit = useCallback(
    debounce(() => formik.submitForm(), 500),
    [formik.submitForm]
  )

  const handleTranslate = (lang: string) => {
    mutation.mutate(
      {
        api_key: translatorApiKey,
        text: formik.values.content.fr,
        target_lang: lang
      },
      {
        onSuccess: (data) => {
          formik.setFieldValue(`content.${lang}`, data.translated_text)
          debouncedSubmit()
        },
        onError: () => {
          alert('translation error')
        }
      }
    )
  }

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
        {CV_LANGUAGES.map((lang) => (
          <Fragment key={`content.${lang}`}>
            {inputType === 'input' && (
              <SectionTextfield
                name={`content.${lang}`}
                lang={lang}
                placeholder={inputPlaceholder}
                isTranslateOption={lang !== 'fr' && isOptionTranslate}
                value={formik.values.content[lang]}
                onTranslate={() => handleTranslate(lang)}
                onChange={(e) => {
                  formik.handleChange(e)
                  debouncedSubmit()
                }}
              />
            )}
            {inputType === 'textarea' && (
              <Stack>
                <SectionTextarea
                  name={`content.${lang}`}
                  lang={lang}
                  value={formik.values.content[lang]}
                  placeholder={inputPlaceholder}
                  isTranslateOption={lang !== 'fr' && isOptionTranslate}
                  maxWarningLength={maxWarningLength}
                  onTranslate={() => handleTranslate(lang)}
                  onChange={(e) => {
                    formik.handleChange(e)
                    debouncedSubmit()
                  }}
                />
              </Stack>
            )}
          </Fragment>
        ))}
      </Stack>
    </SectionItemLayout>
  )
}
