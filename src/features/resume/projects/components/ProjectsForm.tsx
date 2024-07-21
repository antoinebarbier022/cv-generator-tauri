import { AccordionGroup, Stack } from "@mui/joy";
import { FormikProps } from "formik";
import { useState } from "react";

import { AccordionCard } from "../../../../components/AccordionCard";
import { AccordionTitle } from "../../../../components/AccordionTitle";
import { UserData, UserDataExperience } from "../../../storage/types/storage";
import { ProjectForm } from "./ProjectForm";
import { ProjectTitle } from "./ProjectTitle";

interface Props {
  formik: FormikProps<UserData>;
}

export const ProjectsForm = ({ formik }: Props) => {
  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    number | null
  >(null);

  const isMissingField = (experience: UserDataExperience) => {
    return Boolean(
      (!experience.context.fr && experience.context.en) ||
        (experience.context.fr && !experience.context.en) ||
        (!experience.contribution.fr && experience.contribution.en) ||
        (experience.contribution.fr && !experience.contribution.en)
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <AccordionGroup component={Stack} gap={1} disableDivider>
        {formik.values.experiences?.map((field, index) => (
          <AccordionCard
            key={`accordion-project-${index}-${field.id}`}
            index={index}
            title={
              <AccordionTitle
                content={
                  <ProjectTitle
                    program={field.program}
                    client={field.client}
                    role={field.role}
                    date={field.date}
                  />
                }
                isWarningIcon={isMissingField(field)}
              />
            }
            onExpandedChange={(_, expanded) => {
              setIndexExpandedAccordion(expanded ? index : null);
            }}
            expanded={indexExpandedAccordion === index}
            onDelete={() => {
              formik.setFieldValue("experiences", [
                ...(formik.values.experiences?.filter((_, i) => i !== index) ??
                  []),
              ]);
              formik.submitForm();
            }}
          >
            <ProjectForm formik={formik} field={field} index={index} />
          </AccordionCard>
        ))}
      </AccordionGroup>
    </form>
  );
};
