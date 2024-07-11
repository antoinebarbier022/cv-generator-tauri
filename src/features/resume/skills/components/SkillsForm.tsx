import { AccordionGroup, Chip, Input, Stack } from "@mui/joy";
import { FormikProps } from "formik";
import { useState } from "react";
import { AccordionCard } from "../../../../components/AccordionCard";
import { AccordionTitle } from "../../../../components/AccordionTitle";
import { CV_LANGUAGES } from "../../../../constants/languages";
import { UserData } from "../../../storage/types/storage";

interface Props {
  formik: FormikProps<UserData>;
}
export const SkillsForm = ({ formik }: Props) => {
  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    number | null
  >(0);

  return (
    <form onSubmit={formik.handleSubmit}>
      <AccordionGroup disableDivider component={Stack} gap={1}>
        {formik.values.skills?.map((field, index) => (
          <Stack direction="row" width={"100%"} key={index}>
            <AccordionCard
              index={index}
              title={
                <AccordionTitle
                  isWarningIcon={Boolean(!field.fr || !field.en)}
                  content={Boolean(field.fr) ? field.fr : field.en}
                  placeholder={`Skills ${index + 1}`}
                />
              }
              expanded={indexExpandedAccordion === index}
              onExpandedChange={(_, expanded) => {
                setIndexExpandedAccordion(expanded ? index : null);
              }}
              onDelete={() =>
                formik.setFieldValue("skills", [
                  ...(formik.values.skills?.filter((_, i) => i !== index) ??
                    []),
                ])
              }
            >
              <Stack flex={1} gap={1} marginTop={1}>
                {CV_LANGUAGES.map((lang) => (
                  <Input
                    key={`skills[${index}].${lang}`}
                    name={`skills[${index}].${lang}`}
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
