import { AccordionGroup, Stack } from "@mui/joy";
import { FormikProps } from "formik";
import { useState } from "react";

import { AccordionCard } from "../../../components/AccordionCard";
import { AccordionTitle } from "../../../components/AccordionTitle";
import { UserData, UserDataExperience } from "../../storage/types/storage";
import { ProjectForm } from "./ProjectForm";
import { ProjectTitle } from "./ProjectTitle";

interface Props {
  formik: FormikProps<UserData>;
}

export const ProjectsForm = ({ formik }: Props) => {
  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    string | null
  >(null);

  const isMissingField = (experience: UserDataExperience) => {
    return Boolean(
      (!experience.context.fr && experience.context.en) ||
        (experience.context.fr && !experience.context.en) ||
        (experience.role.fr && !experience.role.en) ||
        (!experience.role.fr && experience.role.en) ||
        (!experience.contribution.fr && experience.contribution.en) ||
        (experience.contribution.fr && !experience.contribution.en)
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <AccordionGroup component={Stack} disableDivider>
        {formik.values.experiences?.map((field, index) => (
          <AccordionCard
            key={`accordion-project-${index}-${field.id}`}
            indexCount={index}
            title={
              <AccordionTitle
                content={
                  <ProjectTitle
                    program={field.content.program}
                    client={field.content.client}
                    role={field.content.role.fr || field.content.role.en}
                    date={field.content.date}
                  />
                }
                isWarningIcon={isMissingField(field.content)}
              />
            }
            onExpandedChange={(_, expanded) => {
              setIndexExpandedAccordion(expanded ? field.id : null);
            }}
            expanded={indexExpandedAccordion === field.id}
            onDelete={() => {
              formik.setFieldValue("experiences", [
                ...(formik.values.experiences?.filter((_, i) => i !== index) ??
                  []),
              ]);
              formik.submitForm();
            }}
          >
            <ProjectForm formik={formik} field={field.content} index={index} />
          </AccordionCard>
        ))}
      </AccordionGroup>
    </form>
  );
};
