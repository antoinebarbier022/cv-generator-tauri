import { AccordionGroup, Chip, Stack, Textarea } from "@mui/joy";
import { FormikProps } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AccordionCard } from "../../../../components/AccordionCard";
import { AccordionTitle } from "../../../../components/AccordionTitle";
import { CV_LANGUAGES } from "../../../../constants/languages";
import { UserData } from "../../../storage/types/storage";

interface Props {
  formik: FormikProps<UserData>;
}
export const EmploymentHistoryForm = ({ formik }: Props) => {
  const { t } = useTranslation();
  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    number | null
  >(null);

  return (
    <form onSubmit={formik.handleSubmit}>
      <AccordionGroup disableDivider component={Stack} gap={1}>
        {formik.values.employment_history?.map((field, index) => (
          <Stack direction="row" width={"100%"} key={index}>
            <AccordionCard
              index={index}
              title={
                <AccordionTitle
                  isWarningIcon={Boolean(
                    (field.fr && !field.en) || (!field.fr && field.en)
                  )}
                  content={Boolean(field.fr) ? field.fr : field.en}
                  placeholder={`${t("input.employment-history.label")} ${
                    index + 1
                  }`}
                />
              }
              expanded={indexExpandedAccordion === index}
              onExpandedChange={(_, expanded) => {
                setIndexExpandedAccordion(expanded ? index : null);
              }}
              onDelete={() => {
                formik.setFieldValue("employment_history", [
                  ...(formik.values.employment_history?.filter(
                    (_, i) => i !== index
                  ) ?? []),
                ]);
                formik.submitForm();
              }}
            >
              <Stack flex={1} gap={1} marginTop={1}>
                {CV_LANGUAGES.map((lang) => (
                  <Textarea
                    key={`employment_history[${index}].${lang}`}
                    name={`employment_history[${index}].${lang}`}
                    startDecorator={<Chip>{lang}</Chip>}
                    minRows={2}
                    maxRows={4}
                    value={field[lang as string]}
                    onChange={formik.handleChange}
                    placeholder={t("input.employment-history.placeholder")}
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
