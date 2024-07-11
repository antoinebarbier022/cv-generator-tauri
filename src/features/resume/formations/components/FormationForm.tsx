import { AccordionGroup, Chip, Stack, Textarea } from "@mui/joy";
import { FormikProps } from "formik";
import { useState } from "react";
import { AccordionCard } from "../../../../components/AccordionCard";
import { AccordionTitle } from "../../../../components/AccordionTitle";
import { CV_LANGUAGES } from "../../../../constants/languages";
import { UserData } from "../../../storage/types/storage";

interface Props {
  formik: FormikProps<UserData>;
}
export const FormationForm = ({ formik }: Props) => {
  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    number | null
  >(0);

  return (
    <Stack component="form" gap={4} onSubmit={formik.handleSubmit}>
      <AccordionGroup disableDivider component={Stack} gap={1}>
        {formik.values.formations?.map((field, index) => (
          <Stack direction="row" width={"100%"} key={index}>
            <AccordionCard
              index={index}
              title={
                <AccordionTitle
                  isWarningIcon={Boolean(!field.fr || !field.en)}
                  content={Boolean(field.fr) ? field.fr : field.en}
                  placeholder={`Formation ${index + 1}`}
                />
              }
              expanded={indexExpandedAccordion === index}
              onExpandedChange={(_, expanded) => {
                setIndexExpandedAccordion(expanded ? index : null);
              }}
              onDelete={() =>
                formik.setFieldValue("formations", [
                  ...(formik.values.formations?.filter((_, i) => i !== index) ??
                    []),
                ])
              }
            >
              <Stack flex={1} gap={1} marginTop={1}>
                {CV_LANGUAGES.map((lang) => (
                  <Textarea
                    key={`formations[${index}].${lang}`}
                    name={`formations[${index}].${lang}`}
                    startDecorator={<Chip>{lang}</Chip>}
                    value={field[lang as string]}
                    minRows={2}
                    maxRows={2}
                    onChange={formik.handleChange}
                    placeholder=""
                  />
                ))}
              </Stack>
            </AccordionCard>
          </Stack>
        ))}
      </AccordionGroup>
    </Stack>
  );
};
