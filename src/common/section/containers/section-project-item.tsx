import { SectionItemLayout, SectionItemProps } from '@/common/section/layouts/section-item-layout'
import { AccordionCardTitle } from '@/components/accordion-card-title'
import { CV_LANGUAGES } from '@/constants/cv-languages'
import { TranslateButton } from '@/features/translators/components/translate-button'
import { DeepLService } from '@/features/translators/deepl.service'
import { useTranslatorApiKey } from '@/features/translators/hooks/useTranslatorApiKey'
import { useServerPort } from '@/hooks/userServerPort'
import { useExpandedItemStore } from '@/stores/useExpandedItemStore'
import { ResumeContentSection, UserDataExperience } from '@/types/storage'
import { countWarnings } from '@/utils/warnings.utils'
import { experienceSchemaWithValidation } from '@/validations/dataContentValidationSchema'
import { Chip, FormLabel, Input, Stack, Textarea, Typography } from '@mui/joy'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { SectionProjectItemTitle } from './section-project-item-title'

interface Props extends Omit<SectionItemProps, 'title' | 'isExpanded' | 'onExpandedChange'> {
  data: ResumeContentSection<UserDataExperience>
  isOptionTranslate?: boolean
  onChange: (values: ResumeContentSection<UserDataExperience>) => void
}
export const SectionProjectItem = ({
  data,
  isOptionTranslate,
  index,
  onChange,
  ...rest
}: Props) => {
  const { t } = useTranslation()

  const { expandedItem, setExpandedItem } = useExpandedItemStore()

  const formik = useFormik<ResumeContentSection<UserDataExperience>>({
    initialValues: data,
    onSubmit: (values) => {
      formikOnlyWarning.setValues(values)
      onChange(values)
    }
  })

  // this formik is just to have the validations errors
  // It's not possible to submit a formik form with errors, so to have warnings
  // we need this form
  const formikOnlyWarning = useFormik<ResumeContentSection<UserDataExperience>>({
    initialValues: data,
    validationSchema: yup.object().shape({
      id: yup.string(),
      content: experienceSchemaWithValidation
    }),
    validateOnMount: true,
    onSubmit: () => {}
  })

  const elementsHeaderForm: {
    name: 'program' | 'client' | 'date'
    label: string
    placeholder: string
  }[] = [
    {
      name: 'program',
      label: t('input.project.program.label'),
      placeholder: t('input.project.program.placeholder')
    },
    {
      name: 'client',
      label: t('input.project.client.label'),
      placeholder: t('input.project.client.placeholder')
    },
    {
      name: 'date',
      label: t('input.project.date.label'),
      placeholder: t('input.project.date.placeholder')
    }
  ]

  const elementsBodyForm: {
    label: string
    name: 'context' | 'contribution'
    placeholder: string
    minRows: number
    maxRows: number
    maxLength: number
  }[] = [
    {
      label: t('input.project.context.label'),
      name: 'context',
      placeholder: t('input.project.context.placeholder'),
      minRows: 2,
      maxRows: 4,
      maxLength: 50
    },
    {
      label: t('input.project.contribution.label'),
      name: 'contribution',
      placeholder: t('input.project.contribution.placeholder'),
      minRows: 3,
      maxRows: 6,
      maxLength: 255
    }
  ]

  const debouncedSubmit = useCallback(
    debounce(() => formik.submitForm(), 500),
    [formik.submitForm]
  )

  const { apiKey: translatorApiKey } = useTranslatorApiKey()

  const { port: api_port } = useServerPort()

  const mutation = useMutation({
    mutationKey: ['translators', 'deepl', 'usage'],
    mutationFn: DeepLService.translate
  })

  const countWarns = countWarnings(Object(formikOnlyWarning.errors.content))

  return (
    <SectionItemLayout
      index={index}
      title={
        <AccordionCardTitle
          content={
            <SectionProjectItemTitle
              program={formik.values.content.program}
              client={formik.values.content.client}
              role={formik.values.content.role.fr || formik.values.content.role.en}
              date={formik.values.content.date}
            />
          }
          isWarningIcon={Boolean(formikOnlyWarning.errors.content)}
          warningTitle={t('warning.count-missing-translation', {
            count: countWarns
          })}
        />
      }
      isExpanded={expandedItem === data.id}
      onExpandedChange={(_, expanded) => {
        setExpandedItem(expanded ? formik.values.id : undefined)
      }}
      {...rest}
    >
      <Stack component={'fieldset'} gap={1} sx={{ position: 'relative', flex: 1, border: 'none' }}>
        <Stack direction={'row'} gap={2} flexWrap={'wrap'}>
          {elementsHeaderForm.map((item) => (
            <Stack key={item.name} sx={{ flex: 1 }}>
              <FormLabel>{item.label}</FormLabel>

              <Input
                size="sm"
                id={`content.${item.name}`}
                name={`content.${item.name}`}
                placeholder={item.placeholder}
                value={formik.values.content[item.name]}
                onChange={(e) => {
                  formik.handleChange(e)
                  debouncedSubmit()
                }}
                autoComplete="off"
              />
            </Stack>
          ))}
        </Stack>

        <Stack>
          <FormLabel>{t('input.project.role.label')}</FormLabel>
          <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
            {CV_LANGUAGES.map((lang) => (
              <Input
                key={`content.role.${lang}`}
                name={`content.role.${lang}`}
                size="sm"
                startDecorator={<Chip size="sm">{lang}</Chip>}
                placeholder={t('input.project.role.placeholder')}
                value={formik.values.content.role[lang]}
                onChange={(e) => {
                  formik.handleChange(e)
                  debouncedSubmit()
                }}
                autoComplete="off"
                slotProps={{
                  endDecorator: {
                    sx: {
                      alignSelf: 'flex-end'
                    }
                  }
                }}
              />
            ))}
          </Stack>
        </Stack>

        {elementsBodyForm.map((item) => (
          <Stack key={item.name}>
            <FormLabel>{item.label}</FormLabel>
            <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
              {CV_LANGUAGES.map((lang) => (
                <Textarea
                  key={`content.${item.name}.${lang}`}
                  name={`content.${item.name}.${lang}`}
                  size="sm"
                  className="group"
                  startDecorator={<Chip size="sm">{lang}</Chip>}
                  placeholder={item.placeholder}
                  value={formik.values.content[item.name][lang]}
                  onChange={(e) => {
                    formik.handleChange(e)
                    debouncedSubmit()
                  }}
                  autoComplete="off"
                  minRows={item.minRows}
                  maxRows={item.maxRows}
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
                      direction={'column-reverse'}
                      justifyContent={'space-between'}
                      alignItems={'flex-end'}
                      gap={1}
                      alignContent={'space-between'}
                    >
                      <Typography level="body-xs" textColor={'neutral.500'} sx={{ ml: 'auto' }}>
                        <Typography
                          textColor={
                            formik.values.content[item.name][lang].length > item.maxLength
                              ? 'danger.400'
                              : 'neutral.400'
                          }
                        >
                          {formik.values.content[item.name][lang].length}
                        </Typography>{' '}
                        / {item.maxLength}
                      </Typography>
                      <Stack
                        sx={{
                          display: lang !== 'fr' && isOptionTranslate ? 'inline-block' : 'none'
                        }}
                        className="invisible group-focus-within:visible hover:visible"
                      >
                        <TranslateButton
                          onClick={() => {
                            mutation.mutate(
                              {
                                api_key: translatorApiKey,
                                api_port,
                                text: formik.values.content[item.name].fr,
                                target_lang: lang
                              },
                              {
                                onSuccess: (data) => {
                                  formik.setFieldValue(
                                    `content.${item.name}.${lang}`,
                                    data.translated_text
                                  )
                                  debouncedSubmit()
                                },
                                onError: () => {
                                  alert('translation error')
                                }
                              }
                            )
                          }}
                        />
                      </Stack>
                    </Stack>
                  }
                />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </SectionItemLayout>
  )
}
