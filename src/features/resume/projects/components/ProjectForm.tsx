import { Chip, FormControl, FormLabel, Input, Stack, Textarea } from "@mui/joy";
import { FormikProps } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CV_LANGUAGES } from "../../../../constants/languages";
import { UserData, UserDataExperience } from "../../../storage/types/storage";

interface Props {
  formik: FormikProps<UserData>;
  field: UserDataExperience;
  index: number;
}

export const ProjectForm = ({ formik, field, index }: Props) => {
  const { t } = useTranslation();
  const elementsHeaderForm = useMemo(
    () => [
      {
        name: "program",
        value: field.program,
        label: t("input.project.program.label"),
        placeholder: t("input.project.program.placeholder"),
      },
      {
        name: "client",
        value: field.client,
        label: t("input.project.client.label"),
        placeholder: t("input.project.client.placeholder"),
      },
      {
        name: "role",
        value: field.role,
        label: t("input.project.role.label"),
        placeholder: t("input.project.role.placeholder"),
      },
      {
        name: "date",
        value: field.date,
        label: t("input.project.date.label"),
        placeholder: t("input.project.date.placeholder"),
      },
    ],
    [field]
  );

  const elementsBodyForm = useMemo(
    () => [
      {
        label: t("input.project.context.label"),
        name: "context",
        placeholder: t("input.project.context.placeholder"),
        minRows: 2,
        maxRows: 4,
        getValue: (lang: string) => field.context[lang],
      },
      {
        label: t("input.project.contribution.label"),
        name: "contribution",
        placeholder: t("input.project.contribution.placeholder"),
        minRows: 3,
        maxRows: 6,
        getValue: (lang: string) => field.contribution[lang],
      },
    ],
    [field.context, field.contribution]
  );

  return (
    <Stack
      component={"fieldset"}
      gap={2}
      sx={{ position: "relative", flex: 1, border: "none" }}
    >
      <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
        {elementsHeaderForm.map((item) => (
          <FormControl
            key={`experiences[${index}].${item.name}`}
            sx={{ flex: 1 }}
          >
            <FormLabel>{item.label}</FormLabel>
            <Input
              size="sm"
              name={`experiences[${index}].${item.name}`}
              placeholder={item.placeholder}
              value={item.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
              error={
                formik.touched.experiences && Boolean(formik.errors.experiences)
              }
            />
          </FormControl>
        ))}
      </Stack>

      {elementsBodyForm.map((item) => (
        <Stack key={`experiences[${index}].${item.name}`}>
          <FormLabel>{item.label}</FormLabel>
          <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
            {CV_LANGUAGES.map((lang) => (
              <Textarea
                key={`experiences[${index}].${item.name}.${lang}`}
                name={`experiences[${index}].${item.name}.${lang}`}
                size="sm"
                startDecorator={<Chip size="sm">{lang}</Chip>}
                placeholder={item.placeholder}
                value={item.getValue(lang)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
                minRows={item.minRows}
                maxRows={item.maxRows}
                error={
                  formik.touched.experiences &&
                  Boolean(formik.errors.experiences)
                }
              />
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
