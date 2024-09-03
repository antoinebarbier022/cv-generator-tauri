import { t } from "i18next";
import * as yup from "yup";

export const translationSchema = yup
  .object()
  .shape({
    en: yup.string(),
    fr: yup.string(),
  })
  .test("translations-check", "Traduction manquante", function (value) {
    const { en, fr } = value || {};

    if ((en && !fr) || (!en && fr)) {
      const missingLang = en ? "fr" : "en";
      return this.createError({
        message: `${t("warning.missing-translation")} → [${missingLang}]`,
      });
    }

    return true;
  });

export const sectionSchema = (content: yup.AnyObjectSchema) =>
  yup.array().of(
    yup.object().shape({
      id: yup.string(),
      content,
    })
  );

export const experienceSchema = yup.object().shape({
  program: yup.string(),
  client: yup.string(),
  date: yup.string(),
  role: translationSchema,
  context: translationSchema,
  contribution: translationSchema,
});

export const finalFormValidationSchema = yup.object().shape({
  firstname: yup.string(),
  lastname: yup.string(),
  role: translationSchema,
  grade: yup.string(),
  entity: yup.string(),
  team: yup.string(),
  description: translationSchema,
  linkedin: yup.string(),
  twitter: yup.string(),
  formation: sectionSchema(translationSchema),
  employment_history: sectionSchema(translationSchema),
  articles_and_others: sectionSchema(translationSchema),
  sectors: sectionSchema(translationSchema),
  skills: sectionSchema(translationSchema),
  languages: sectionSchema(translationSchema),
  experiences: sectionSchema(experienceSchema),
});

export const dataContentValidationSchema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  role: translationSchema,
  grade: yup.string().required(),
  entity: yup.string().required(),
  team: yup.string().required(),
  description: translationSchema.required(),
  linkedin: yup.string(),
  twitter: yup.string(),
  formation: sectionSchema(translationSchema),
  employment_history: sectionSchema(translationSchema),
  articles_and_others: sectionSchema(translationSchema),
  sectors: sectionSchema(translationSchema),
  skills: sectionSchema(translationSchema),
  languages: sectionSchema(translationSchema),
  experiences: sectionSchema(experienceSchema),
});
