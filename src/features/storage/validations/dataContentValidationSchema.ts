import * as yup from "yup";

const translationSchema = yup.object().shape({
  en: yup.string(),
  fr: yup.string().nullable(),
});

const experienceSchema = yup.object().shape({
  program: yup.string(),
  client: yup.string(),
  role: yup.string(),
  date: yup.string(),
  context: translationSchema,
  contribution: translationSchema,
});

export const dataContentValidationSchema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  role: translationSchema.required(),
  grade: yup.string().required(),
  entity: yup.string().required(),
  team: yup.string().required(),
  description: translationSchema.required(),
  linkedin: yup.string().required(),
  twitter: yup.string(),
  formations: yup.array().of(translationSchema),
  employment_history: yup.array().of(translationSchema),
  articles_and_others: yup.array().of(yup.string()),
  sectors: yup.array().of(translationSchema),
  skills: yup.array().of(translationSchema),
  languages: yup.array().of(translationSchema),
  experiences: yup.array().of(experienceSchema),
});
