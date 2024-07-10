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
  firstname: yup.string(),
  lastname: yup.string(),
  role: translationSchema,
  grade: yup.string(),
  entity: yup.string(),
  team: yup.string(),
  description: translationSchema,
  linkedin: yup.string(),
  twitter: yup.string(),
  formations: yup.array().of(translationSchema),
  employment_history: yup.array().of(translationSchema),
  articles_and_others: yup.array().of(yup.string()),
  sectors: yup.array().of(translationSchema),
  skills: yup.array().of(translationSchema),
  languages: yup.array().of(translationSchema),
  experiences: yup.array().of(experienceSchema),
});
