import { t } from 'i18next'
import * as yup from 'yup'

export const translationSchemaWithValidation = yup
  .object()
  .shape({
    en: yup.string(),
    fr: yup.string()
  })
  .test('translations-check', 'Traduction manquante', function (value) {
    const { en, fr } = value || {}

    if ((en && !fr) || (!en && fr)) {
      const missingLang = en ? 'fr' : 'en'
      return this.createError({
        message: `${t('warning.missing-translation')} → [${missingLang}]`
      })
    }

    return true
  })

export const translationSchema = yup.object().shape({
  en: yup.string(),
  fr: yup.string()
})

export const sectionSchema = (content: yup.AnyObjectSchema) =>
  yup.array().of(
    yup.object().shape({
      id: yup.string(),
      content
    })
  )

export const experienceSchemaWithValidation = yup.object().shape({
  program: yup.string().required('kdd,d'),
  client: yup.string(),
  date: yup.string(),
  role: translationSchemaWithValidation,
  context: translationSchemaWithValidation,
  contribution: translationSchemaWithValidation
})

export const experienceSchema = yup.object().shape({
  program: yup.string(),
  client: yup.string(),
  date: yup.string(),
  role: translationSchema,
  context: translationSchema,
  contribution: translationSchema
})

export const finalFormValidationSchema = yup.object().shape({
  firstname: yup.string(),
  lastname: yup.string(),
  role: translationSchemaWithValidation,
  grade: yup.string(),
  entity: yup.string(),
  team: yup.string(),
  description: translationSchemaWithValidation,
  linkedin: yup.string(),
  twitter: yup.string(),
  formation: sectionSchema(translationSchemaWithValidation),
  employment_history: sectionSchema(translationSchemaWithValidation),
  articles_and_others: sectionSchema(translationSchemaWithValidation),
  sectors: sectionSchema(translationSchemaWithValidation),
  skills: sectionSchema(translationSchemaWithValidation),
  languages: sectionSchema(translationSchemaWithValidation),
  experiences: sectionSchema(experienceSchemaWithValidation)
})

export const ResumeValidationSchemaForImportation = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  role: translationSchema,
  grade: yup.string().required(),
  entity: yup.string().required(),
  team: yup.string(),
  description: translationSchema.required(),
  linkedin: yup.string(),
  twitter: yup.string(),
  formation: sectionSchema(translationSchema),
  employment_history: sectionSchema(translationSchema),
  articles_and_others: sectionSchema(translationSchema),
  sectors: sectionSchema(translationSchema),
  skills: sectionSchema(translationSchema),
  languages: sectionSchema(translationSchema),
  experiences: sectionSchema(experienceSchema)
})
