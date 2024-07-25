import { AccordionGroup, Stack, Typography } from "@mui/joy";

import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { AccordionCard } from "../../components/AccordionCard";
import { AccordionTitle } from "../../components/AccordionTitle";
import { EmptyState } from "../../components/EmptyState";
import { IconButtonAdd } from "../../components/IconButtonAdd";
import { PageLayout } from "../../layouts/PageLayout";

import { ProjectForm } from "../../components/ProjectForm";
import { ProjectTitle } from "../../components/ProjectTitle";
import { useFormCV } from "../../features/form/hooks/useFormCV";
import {
  ResumeContentSection,
  UserDataExperience,
} from "../../features/storage/types/storage";

export const Projects = () => {
  const { t } = useTranslation();
  const { userData, formik, dragEnded } = useFormCV();

  const handleAddProject = () => {
    formik.setFieldValue("experiences", [
      {
        id: crypto.randomUUID(),
        content: {
          client: "",
          program: "",
          role: {
            en: "",
            fr: "",
          },
          date: "",
          context: {
            en: "",
            fr: "",
          },
          contribution: {
            en: "",
            fr: "",
          },
        },
      } as ResumeContentSection<UserDataExperience>,
      ...(formik.values.experiences ?? []),
    ]);
    formik.submitForm();
  };
  const isEmptyData = userData.data && userData.data?.experiences.length === 0;

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
    <DragDropContext onDragEnd={(result) => dragEnded(result, "experiences")}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <PageLayout
            ref={provided.innerRef}
            {...provided.droppableProps}
            title={t("resume.section.projects.title")}
            chip={String(formik.values.experiences.length)}
            endDecorator={<IconButtonAdd onClick={handleAddProject} />}
          >
            {userData.isPending && <Typography>Loading...</Typography>}
            {userData.isError && <Typography>Error.</Typography>}
            {isEmptyData ? (
              <EmptyState
                title={t("empty-state.project.title")}
                description={t("empty-state.project.description")}
                labelButton={t("empty-state.project.button.label")}
                onClickButton={handleAddProject}
              />
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <AccordionGroup component={Stack} disableDivider>
                  {formik.values.experiences?.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
                      index={index}
                    >
                      {(_provided) => (
                        <AccordionCard
                          key={field.id}
                          indexCount={index}
                          isDragIndicator
                          ref={_provided.innerRef}
                          {..._provided.draggableProps}
                          {..._provided.dragHandleProps}
                          title={
                            <AccordionTitle
                              content={
                                <ProjectTitle
                                  program={field.content.program}
                                  client={field.content.client}
                                  role={
                                    field.content.role.fr ||
                                    field.content.role.en
                                  }
                                  date={field.content.date}
                                />
                              }
                              isWarningIcon={isMissingField(field.content)}
                            />
                          }
                          onExpandedChange={(_, expanded) => {
                            setIndexExpandedAccordion(
                              expanded ? field.id : null
                            );
                          }}
                          expanded={indexExpandedAccordion === field.id}
                          onDelete={() => {
                            formik.setFieldValue("experiences", [
                              ...(formik.values.experiences?.filter(
                                (_, i) => i !== index
                              ) ?? []),
                            ]);
                            formik.submitForm();
                          }}
                        >
                          <ProjectForm
                            formik={formik}
                            field={field.content}
                            index={index}
                          />
                        </AccordionCard>
                      )}
                    </Draggable>
                  ))}
                </AccordionGroup>
              </form>
            )}
          </PageLayout>
        )}
      </Droppable>
    </DragDropContext>
  );
};
