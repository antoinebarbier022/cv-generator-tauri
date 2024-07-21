import * as yup from "yup";

const translationSchema = yup.object().shape({
  en: yup.string(),
  fr: yup.string().nullable(),
});

const sectionSchema = (content: yup.AnyObjectSchema) =>
  yup.array().of(
    yup.object().shape({
      id: yup.string().uuid(),
      content,
    })
  );

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
  formation: sectionSchema(translationSchema),
  employment_history: sectionSchema(translationSchema),
  articles_and_others: sectionSchema(translationSchema),
  sectors: sectionSchema(translationSchema),
  skills: sectionSchema(translationSchema),
  languages: sectionSchema(translationSchema),
  experiences: sectionSchema(experienceSchema),
});
