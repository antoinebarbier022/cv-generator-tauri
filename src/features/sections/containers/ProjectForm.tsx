import {
  Chip,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { useFormik } from "formik";
import debounce from "just-debounce-it";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CV_LANGUAGES } from "../../form/constants/cv-languages";
import {
  ResumeContentSection,
  UserDataExperience,
} from "../../storage/types/storage";

interface Props {
  data: ResumeContentSection<UserDataExperience>;
  onChange: (values: ResumeContentSection<UserDataExperience>) => void;
}

export const ProjectForm = ({ data, onChange }: Props) => {
  const { t } = useTranslation();

  const formik = useFormik<ResumeContentSection<UserDataExperience>>({
    initialValues: data,
    onSubmit: (values) => {
      onChange(values);
    },
  });

  const elementsHeaderForm = useMemo(
    () => [
      {
        name: "content.program",
        value: formik.values.content.program,
        label: t("input.project.program.label"),
        placeholder: t("input.project.program.placeholder"),
      },
      {
        name: "content.client",
        value: formik.values.content.client,
        label: t("input.project.client.label"),
        placeholder: t("input.project.client.placeholder"),
      },
      {
        name: "content.date",
        value: formik.values.content.date,
        label: t("input.project.date.label"),
        placeholder: t("input.project.date.placeholder"),
      },
    ],
    [formik.values.content]
  );

  const elementsBodyForm = useMemo(
    () => [
      {
        label: t("input.project.context.label"),
        name: "content.context",
        placeholder: t("input.project.context.placeholder"),
        minRows: 2,
        maxRows: 4,
        maxLength: 50,
        getValue: (lang: string) => formik.values.content.context[lang],
      },
      {
        label: t("input.project.contribution.label"),
        name: "content.contribution",
        placeholder: t("input.project.contribution.placeholder"),
        minRows: 3,
        maxRows: 6,
        maxLength: 255,
        getValue: (lang: string) => formik.values.content.contribution[lang],
      },
    ],
    [formik.values.content.context, formik.values.content.contribution]
  );

  const debouncedSubmit = useCallback(
    debounce(() => formik.submitForm(), 500),
    [2000, formik.submitForm]
  );

  return (
    <Stack
      component={"fieldset"}
      gap={1}
      sx={{ position: "relative", flex: 1, border: "none" }}
    >
      <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
        {elementsHeaderForm.map((item) => (
          <FormControl key={item.name} sx={{ flex: 1 }}>
            <FormLabel>{item.label}</FormLabel>
            <Input
              size="sm"
              name={item.name}
              placeholder={item.placeholder}
              value={item.value}
              onChange={(e) => {
                formik.handleChange(e);
                debouncedSubmit();
              }}
              autoComplete="off"
            />
          </FormControl>
        ))}
      </Stack>

      <Stack>
        <FormLabel>{t("input.project.role.label")}</FormLabel>
        <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
          {CV_LANGUAGES.map((lang) => (
            <Input
              key={`content.role.${lang}`}
              name={`content.role.${lang}`}
              size="sm"
              startDecorator={<Chip size="sm">{lang}</Chip>}
              placeholder={t("input.project.role.placeholder")}
              value={formik.values.content.role[lang]}
              onChange={(e) => {
                formik.handleChange(e);
                debouncedSubmit();
              }}
              autoComplete="off"
              slotProps={{
                endDecorator: {
                  sx: {
                    alignSelf: "flex-end",
                  },
                },
              }}
            />
          ))}
        </Stack>
      </Stack>

      {elementsBodyForm.map((item) => (
        <Stack key={item.name}>
          <FormLabel>{item.label}</FormLabel>
          <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
            {CV_LANGUAGES.map((lang) => (
              <Textarea
                key={`${item.name}.${lang}`}
                name={`${item.name}.${lang}`}
                size="sm"
                startDecorator={<Chip size="sm">{lang}</Chip>}
                placeholder={item.placeholder}
                value={item.getValue(lang)}
                onChange={(e) => {
                  formik.handleChange(e);
                  debouncedSubmit();
                }}
                autoComplete="off"
                minRows={item.minRows}
                maxRows={item.maxRows}
                slotProps={{
                  endDecorator: {
                    sx: {
                      alignSelf: "flex-end",
                    },
                  },
                }}
                endDecorator={
                  <Typography
                    level="body-xs"
                    textColor={"neutral.500"}
                    sx={{ ml: "auto" }}
                  >
                    <Typography
                      textColor={
                        item.getValue(lang).length > item.maxLength
                          ? "danger.400"
                          : "neutral.400"
                      }
                    >
                      {item.getValue(lang).length}
                    </Typography>{" "}
                    / {item.maxLength}
                  </Typography>
                }
              />
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
