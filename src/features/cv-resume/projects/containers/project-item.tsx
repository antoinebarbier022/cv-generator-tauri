import { AccordionCardTitle } from '@/components/accordion-card-title'
import { CV_LANGUAGES } from '@/constants/cv-languages'
import { SectionItemLayout, SectionItemProps } from '@/layouts/section-item-layout'
import { useExpandedItemStore } from '@/stores/useExpandedItemStore'
import { ResumeContentSection, UserDataExperience } from '@/types/storage'
import { Chip, FormLabel, Input, Stack, Textarea, Typography } from '@mui/joy'
import { useFormik } from 'formik'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectTitle } from '../components/project-title'

interface Props extends Omit<SectionItemProps, 'title' | 'isExpanded' | 'onExpandedChange'> {
  data: ResumeContentSection<UserDataExperience>
  onChange: (values: ResumeContentSection<UserDataExperience>) => void
}
export const ProjectItem = ({ data, index, onChange, ...rest }: Props) => {
  const { t } = useTranslation()

  const { expandedItem, setExpandedItem } = useExpandedItemStore()

  const formik = useFormik<ResumeContentSection<UserDataExperience>>({
    initialValues: data,
    onSubmit: (values) => {
      onChange(values)
    }
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

  return (
    <SectionItemLayout
      index={0}
      title={
        <AccordionCardTitle
          content={
            <ProjectTitle
              program={formik.values.content.program}
              client={formik.values.content.client}
              role={formik.values.content.role.fr || formik.values.content.role.en}
              date={formik.values.content.date}
            />
          }
          isWarningIcon
        />
      }
      {...rest}
      isVisible={Boolean(formik.values.isHidden)}
      isExpanded={expandedItem === formik.values.id}
      onExpandedChange={(_, expanded) => {
        setExpandedItem(expanded ? formik.values.id : undefined)
      }}
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
                        alignSelf: 'flex-end'
                      }
                    }
                  }}
                  endDecorator={
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
