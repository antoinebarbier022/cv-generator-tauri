import { PageLayout } from '@/layouts/page-layout'
import {
  AspectRatio,
  Avatar,
  Button,
  Card,
  CardOverflow,
  Chip,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  Link,
  Option,
  Select,
  Stack,
  Textarea,
  Typography
} from '@mui/joy'

import { CV_LANGUAGES } from '@/constants/cv-languages'
import { useDeleteImageProfileStorage } from '@/hooks/useDeleteImageProfileStorage'
import { useFormCV } from '@/hooks/useFormCV'
import { useSetImageProfileStorage } from '@/hooks/useSetImageProfileStorage'
import { Translation } from '@/types/storage'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { useFormik } from 'formik'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface ProfileData {
  firstname: string
  lastname: string
  grade: string
  entity: string
  team: string
  linkedin: string
  picture: string
  role: Translation
  description: Translation
}

export const ProfilePage = () => {
  const { t } = useTranslation()

  const { formValues, setFormValues } = useFormCV()

  const formik = useFormik<ProfileData>({
    initialValues: formValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      setFormValues(values)
    }
  })

  const debouncedSubmit = useCallback(
    debounce(() => formik.submitForm(), 500),
    [formik.submitForm]
  )

  const mutationReplacePicture = useSetImageProfileStorage()
  const mutationDeletePicture = useDeleteImageProfileStorage()

  const handleChangePicture = () => {
    mutationReplacePicture.mutate(undefined, {
      onSuccess: async (data) => {
        if (data !== null) {
          setFormValues({
            picture: data
          })
          await formik.setFieldValue('picture', data)
        }
      }
    })
  }

  const handleDeletePicture = () => {
    mutationDeletePicture.mutate(undefined, {
      onSuccess: async () => {
        setFormValues({
          picture: ''
        })
        await formik.setFieldValue('picture', '')
      }
    })
  }

  const gradeOptions = ['A', 'B', 'C', 'D', 'E', 'F']

  const entityOptions = new Map<string, string>([
    ['BR', 'Business Reinvention'],
    ['CXT', 'CX Transformation'],
    ['CDT', 'Customer Data & Tech'],
    ['CD', 'Creative & Design']
  ])

  const variantInputStyle = 'plain'

  return (
    <PageLayout title={t('resume.section.profile.title')}>
      <Stack gap={2}>
        <Stack direction={'row'} gap={2}>
          <Stack direction={'column'} gap={'1rem'} flex={1}>
            <Stack direction={'row'} gap={2} flexWrap={'wrap'}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>{t('input.firstname.label')}</FormLabel>
                <Input
                  id="firstname"
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={(e) => {
                    formik.handleChange(e)
                    debouncedSubmit()
                  }}
                  placeholder={t('input.firstname.placeholder')}
                  variant={variantInputStyle}
                />
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <FormLabel>{t('input.lastname.label')}</FormLabel>
                <Input
                  id="lastname"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={(e) => {
                    formik.handleChange(e)
                    debouncedSubmit()
                  }}
                  placeholder={t('input.lastname.placeholder')}
                  variant={variantInputStyle}
                />
              </FormControl>
            </Stack>

            <Stack direction={'row'} flexWrap={'wrap'} gap={2}>
              <FormControl>
                <FormLabel>{t('input.grade.label')}</FormLabel>
                <Select
                  name="grade"
                  value={Boolean(formik.values.grade) ? formik.values.grade : null}
                  onChange={(_, value) => {
                    formik.setFieldValue('grade', value)
                    debouncedSubmit()
                  }}
                  placeholder={t('input.grade.placeholder')}
                  variant={variantInputStyle}
                  sx={{ width: '7ch' }}
                >
                  {gradeOptions.map((value) => (
                    <Option value={value} key={`grade-${value}`}>
                      {value}
                    </Option>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <FormLabel>{t('input.entity.label')}</FormLabel>

                <Select
                  name="entity"
                  value={Boolean(formik.values.entity) ? formik.values.entity : null}
                  onChange={(_, value) => {
                    formik.setFieldValue('entity', value)
                    formik.setFieldValue('team', (value && entityOptions.get(value)) ?? '')
                    debouncedSubmit()
                  }}
                  variant={variantInputStyle}
                  placeholder={t('input.entity.placeholder')}
                >
                  {Array.from(entityOptions).map(([key, value]) => (
                    <Option value={key} label={value} key={`entity-${key}`}>
                      {value}
                      <span className="w-[4.5ch] text-neutral-500">[{key}]</span>
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack direction={'row'} gap={2} flexWrap={'wrap'}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>{t('input.linkedin.label')}</FormLabel>
                <Input
                  name="linkedin"
                  value={formik.values.linkedin}
                  onChange={(e) => {
                    formik.handleChange(e)
                    debouncedSubmit()
                  }}
                  variant={variantInputStyle}
                  placeholder={t('input.linkedin.placeholder')}
                />
              </FormControl>
            </Stack>
          </Stack>
          <Stack ml={2} gap={1}>
            <Stack>
              <FormLabel>{t('input.picture.label')}</FormLabel>
              <Card sx={{ border: 'none', position: 'relative' }}>
                <CardOverflow>
                  <AspectRatio ratio={1} sx={{ width: '160px', height: '160px' }}>
                    <Avatar
                      sx={{
                        borderRadius: 0,
                        backgroundColor: 'neutral.50',
                        width: '100%'
                      }}
                      src={
                        formik.values.picture
                          ? `${convertFileSrc(formik.values.picture)}?removeCache=${new Date()}`
                          : ''
                      }
                    />
                    {mutationReplacePicture.isPending && (
                      <Stack
                        position={'absolute'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#0007'
                        }}
                      >
                        <CircularProgress variant="plain" color="neutral" />
                      </Stack>
                    )}
                  </AspectRatio>
                </CardOverflow>
              </Card>
            </Stack>
            <Stack gap={1}>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{ fontWeight: '400' }}
                onClick={handleChangePicture}
              >
                {formik.values.picture
                  ? t('button.replace-profile-image.label')
                  : t('button.upload-profile-image.label')}
              </Button>
              <Typography
                level="body-sm"
                fontWeight={400}
                visibility={Boolean(formik.values.picture) ? 'visible' : 'hidden'}
                textColor={'primary.500'}
                component={Link}
                onClick={handleDeletePicture}
                textAlign={'center'}
              >
                {t('button.delete-profile-image.label')}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack gap={2}>
          <Stack>
            <FormLabel>{t('input.role.label')}</FormLabel>
            <Stack direction={'row'} flexWrap={'wrap'} gap={2}>
              {CV_LANGUAGES.map((lang) => (
                <Input
                  key={`role.${lang}`}
                  name={`role.${lang}`}
                  startDecorator={
                    <Chip
                      variant="plain"
                      sx={{
                        marginLeft: -0.75
                      }}
                    >
                      {lang}
                    </Chip>
                  }
                  value={formik.values.role[lang]}
                  onChange={(e) => {
                    formik.handleChange(e)
                    debouncedSubmit()
                  }}
                  variant={variantInputStyle}
                  placeholder={`${t('input.role.placeholder')}`}
                />
              ))}
            </Stack>
          </Stack>

          <Stack>
            <FormLabel>{t('input.description.label')}</FormLabel>
            <Stack direction={'row'} flexWrap={'wrap'} gap={2}>
              {CV_LANGUAGES.map((lang) => (
                <Textarea
                  key={`description.${lang}`}
                  name={`description.${lang}`}
                  startDecorator={<Chip variant="plain">{lang}</Chip>}
                  value={formik.values.description[lang]}
                  onChange={(e) => {
                    formik.handleChange(e)
                    debouncedSubmit()
                  }}
                  variant={variantInputStyle}
                  placeholder={t('input.description.placeholder')}
                  minRows={4}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </PageLayout>
  )
}
