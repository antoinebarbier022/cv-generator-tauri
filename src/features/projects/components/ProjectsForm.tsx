import { AddRounded } from "@mui/icons-material";
import { AccordionGroup, Button, Stack } from "@mui/joy";
import { FormikProps } from "formik";
import { useState } from "react";

import { AccordionCard } from "../../../components/AccordionCard";
import { UserData, UserDataExperience } from "../../storage/types/storage";
import { ProjectForm } from "./ProjectForm";
import { ProjectTitle } from "./ProjectTitle";

interface Props {
  formik: FormikProps<UserData>;
}

export const ProjectsForm = ({ formik }: Props) => {
  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    number | null
  >(0);

  const handleAddProject = () => {
    formik.setFieldValue("experiences", [
      ...(formik.values.experiences ?? []),
      {
        id: crypto.randomUUID(),
        client: "",
        program: "",
        role: "",
        date: "",
        context: {
          en: "",
          fr: "",
        },
        contribution: {
          en: "",
          fr: "",
        },
      } as UserDataExperience,
    ]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Button
        size="sm"
        variant="outlined"
        startDecorator={<AddRounded />}
        disabled={Boolean(formik.errors.experiences)}
        sx={{
          position: "fixed",
          top: "2rem",
          right: "2rem",
        }}
        onClick={handleAddProject}
      >
        Add Project
      </Button>

      <AccordionGroup component={Stack} gap={1} disableDivider>
        {formik.values.experiences?.map((field, index) => (
          <AccordionCard
            index={index}
            title={
              <ProjectTitle
                program={field.program}
                client={field.client}
                date={field.date}
              />
            }
            onExpandedChange={(_, expanded) => {
              setIndexExpandedAccordion(expanded ? index : null);
            }}
            expanded={indexExpandedAccordion === index}
            onDelete={() =>
              formik.setFieldValue("experiences", [
                ...(formik.values.experiences?.filter((_, i) => i !== index) ??
                  []),
              ])
            }
          >
            <ProjectForm formik={formik} field={field} index={index} />
          </AccordionCard>
        ))}
      </AccordionGroup>
    </form>
  );
};
