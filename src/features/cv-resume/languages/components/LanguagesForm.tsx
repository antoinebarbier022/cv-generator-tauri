import { AddRounded } from "@mui/icons-material";
import { AccordionGroup, Button, Chip, Input, Stack } from "@mui/joy";
import { FormikProps } from "formik";
import { useState } from "react";
import { AccordionCard } from "../../../../components/AccordionCard";
import { AccordionTitle } from "../../../../components/AccordionTitle";
import { CV_LANGUAGES } from "../../../configuration/constants/languages";
import { UserData } from "../../../storage/types/storage";

interface Props {
  formik: FormikProps<UserData>;
}
export const LanguagesForm = ({ formik }: Props) => {
  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    number | null
  >(0);

  const handleAddLanguage = () =>
    formik.setFieldValue("languages", [...(formik.values.languages ?? []), ""]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Button
        size="sm"
        variant="outlined"
        startDecorator={<AddRounded />}
        disabled={Boolean(formik.errors.languages)}
        sx={{
          position: "fixed",
          top: "2rem",
          right: "2rem",
          zIndex: 10,
          backgroundColor: "white",
        }}
        onClick={handleAddLanguage}
      >
        Add Language
      </Button>

      <AccordionGroup disableDivider component={Stack} gap={1}>
        {formik.values.languages?.map((field, index) => (
          <Stack direction="row" width={"100%"} key={index}>
            <AccordionCard
              index={index}
              title={
                <AccordionTitle
                  isWarningIcon={Boolean(!field.fr || !field.en)}
                  content={Boolean(field.fr) ? field.fr : field.en}
                  placeholder={`Languages ${index + 1}`}
                />
              }
              expanded={indexExpandedAccordion === index}
              onExpandedChange={(_, expanded) => {
                setIndexExpandedAccordion(expanded ? index : null);
              }}
              onDelete={() =>
                formik.setFieldValue("languages", [
                  ...(formik.values.languages?.filter((_, i) => i !== index) ??
                    []),
                ])
              }
            >
              <Stack flex={1} gap={1} marginTop={1}>
                {CV_LANGUAGES.map((lang) => (
                  <Input
                    key={`languages[${index}].${lang}`}
                    name={`languages[${index}].${lang}`}
                    startDecorator={
                      <Chip
                        sx={{
                          marginLeft: -0.75,
                        }}
                      >
                        {lang}
                      </Chip>
                    }
                    value={field[lang as string]}
                    onChange={formik.handleChange}
                    placeholder=""
                  />
                ))}
              </Stack>
            </AccordionCard>
          </Stack>
        ))}
      </AccordionGroup>
    </form>
  );
};
