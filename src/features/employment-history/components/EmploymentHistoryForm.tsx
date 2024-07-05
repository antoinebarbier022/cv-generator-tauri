import { AddRounded } from "@mui/icons-material";
import { AccordionGroup, Button, Chip, Stack, Textarea } from "@mui/joy";
import { FormikProps } from "formik";
import { useState } from "react";
import { AccordionCard } from "../../../components/AccordionCard";
import { AccordionTitle } from "../../../components/AccordionTitle";
import { CV_LANGUAGES } from "../../configuration/constants/languages";
import { UserData } from "../../storage/types/storage";

interface Props {
  formik: FormikProps<UserData>;
}
export const EmploymentHistoryForm = ({ formik }: Props) => {
  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    number | null
  >(0);

  const handleAddEmploymentHistory = () =>
    formik.setFieldValue("employment_history", [
      ...(formik.values.employment_history ?? []),
      "",
    ]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Button
        size="sm"
        variant="outlined"
        startDecorator={<AddRounded />}
        disabled={Boolean(formik.errors.employment_history)}
        sx={{
          position: "fixed",
          top: "2rem",
          right: "2rem",
        }}
        onClick={handleAddEmploymentHistory}
      >
        Add Employment History
      </Button>
      <AccordionGroup disableDivider component={Stack} gap={1}>
        {formik.values.employment_history?.map((field, index) => (
          <Stack direction="row" width={"100%"} key={index}>
            <AccordionCard
              index={index}
              title={
                <AccordionTitle
                  content={field.fr}
                  index={index}
                  placeholder={`Employment History ${index + 1}`}
                />
              }
              expanded={indexExpandedAccordion === index}
              onExpandedChange={(_, expanded) => {
                setIndexExpandedAccordion(expanded ? index : null);
              }}
              onDelete={() =>
                formik.setFieldValue("employment_history", [
                  ...(formik.values.employment_history?.filter(
                    (_, i) => i !== index
                  ) ?? []),
                ])
              }
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
