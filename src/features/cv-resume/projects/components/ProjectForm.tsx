import { Chip, FormControl, FormLabel, Input, Stack, Textarea } from "@mui/joy";
import { FormikProps } from "formik";
import { CV_LANGUAGES } from "../../../configuration/constants/languages";
import { UserData, UserDataExperience } from "../../../storage/types/storage";

interface Props {
  formik: FormikProps<UserData>;
  field: UserDataExperience;
  index: number;
}

export const ProjectForm = ({ formik, field, index }: Props) => {
  const elementsHeaderForm = [
    {
      name: "program",
      value: field.program,
      label: "Program",
      placeholder: "",
    },
    {
      name: "client",
      value: field.client,
      label: "Client",
      placeholder: "",
    },
    {
      name: "date",
      value: field.date,
      label: "Date",
      placeholder: "",
    },
  ];

  const elementsBodyForm = [
    {
      label: "Context",
      name: "context",
      placeholder: "",
      minRows: 2,
      maxRows: 4,
      getValue: (lang: string) => field.context[lang],
    },
    {
      label: "Contribution",
      name: "contribution",
      placeholder: "",
      minRows: 3,
      maxRows: 6,
      getValue: (lang: string) => field.contribution[lang],
    },
  ];

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
              autoComplete="off"
              error={
                formik.touched.experiences && Boolean(formik.errors.experiences)
              }
            />
          </FormControl>
        ))}
      </Stack>

      {elementsBodyForm.map((item) => (
        <FormControl>
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
        </FormControl>
      ))}
    </Stack>
  );
};
