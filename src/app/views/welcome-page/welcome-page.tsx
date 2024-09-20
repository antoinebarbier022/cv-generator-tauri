import { useFormCV } from '@/shared/hooks/useFormCV'
import { ArrowForwardRounded } from '@mui/icons-material'
import { Button, CircularProgress, Input, Stack, Typography } from '@mui/joy'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export const WelcomePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [isLoading, setLoading] = useState(false)
  const [isForm, setIsForm] = useState(false)

  const { setFormValues } = useFormCV()

  const formik = useFormik<{ firstname: string; lastname: string }>({
    initialValues: {
      firstname: '',
      lastname: ''
    },
    validationSchema: yup.object().shape({
      firstname: yup.string().required(),
      lastname: yup.string().required()
    }),
    validateOnMount: true,
    onSubmit: (values) => {
      setFormValues({
        firstname: values.firstname,
        lastname: values.lastname
      })
      setLoading(true)
      setTimeout(() => {
        navigate('/profile', { replace: true })
      }, 1700)
    }
  })
  if (isLoading) {
    return (
      <Stack alignItems={'center'} gap={4} mb={8}>
        <CircularProgress size="lg" />
      </Stack>
    )
  }

  if (isForm) {
    return (
      <Stack gap={4} component={'form'} onSubmit={formik.handleSubmit}>
        <Stack>
          <Typography level="title-lg">{t('welcome-page.first-information.title')}</Typography>
          <Typography level="body-lg" fontWeight={300}>
            {t('welcome-page.first-information.description')}
          </Typography>
        </Stack>

        <Stack gap={2}>
          <Input
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="lg"
            variant="soft"
            placeholder={t('input.firstname.placeholder')}
          />
          <Input
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="lg"
            variant="soft"
            placeholder={t('input.lastname.placeholder')}
          />
        </Stack>
        <Stack direction={'row'} alignItems={'end'} justifyContent={'end'} gap={2}>
          <Button
            type="submit"
            size="lg"
            color="primary"
            endDecorator={<ArrowForwardRounded />}
            disabled={!(formik.isValid && formik.touched)}
          >
            {t('core.next')}
          </Button>
        </Stack>
      </Stack>
    )
  }
  return (
    <Stack>
      <Stack mb={4}>
        <Typography level="h1" fontFamily={'BentonSans'} fontWeight={500}>
          {t('welcome-page.title')}
        </Typography>
        <Typography level="body-lg">{t('welcome-page.description')}</Typography>
      </Stack>

      <Stack direction={'row'} alignItems={'end'} justifyContent={'space-between'} gap={2}>
        <Button
          onClick={() => {
            setIsForm(true)
          }}
          size="lg"
          color="primary"
          endDecorator={<ArrowForwardRounded />}
        >
          {t('welcome-page.cta.start')}
        </Button>
      </Stack>
    </Stack>
  )
}
