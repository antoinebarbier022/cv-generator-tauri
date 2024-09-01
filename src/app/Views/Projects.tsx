import { AccordionGroup, Stack } from "@mui/joy";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AccordionTitle } from "../../components/AccordionTitle";
import { EmptyState } from "../../components/EmptyState";

import { ProjectForm } from "../../components/ProjectForm";
import { ProjectTitle } from "../../components/ProjectTitle";
import { useFormCV } from "../../features/form/hooks/useFormCV";
import { SectionDroppableLayout } from "../../features/sections/layouts/SectionDroppableLayout";
import { SectionItemLayout } from "../../features/sections/layouts/SectionItemLayout";
import {
  ResumeContentSection,
  UserDataExperience,
} from "../../features/storage/types/storage";

export const Projects = () => {
  const { t } = useTranslation();
  const { userData, formik, dragEnded, handleDeleteItemSection } = useFormCV();

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

  const handleDeleteById = (id: string) => {
    handleDeleteItemSection({ fieldName: "experiences", idSelected: id });
  };

  return (
    <>
      <SectionDroppableLayout
        title={t("resume.section.projects.title")}
        chip={String(formik.values["experiences"].length)}
        droppableId={"droppable"}
        onDragEnd={(result) => dragEnded(result, "experiences")}
        onAddItem={handleAddProject}
        isError={userData.isError}
        isEmpty={isEmptyData}
        isLoading={userData.isPending}
        emptyContent={
          <EmptyState
            title={t("empty-state.project.title")}
            description={t("empty-state.project.description")}
            labelButton={t("empty-state.project.button.label")}
            onClickButton={handleAddProject}
          />
        }
      >
        <AccordionGroup component={Stack} disableDivider>
          {formik.values.experiences?.map((field, index) => (
            <SectionItemLayout
              index={index}
              draggableId={field.id}
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
              isVisible={Boolean(field.isHidden)}
              isExpanded={indexExpandedAccordion === field.id}
              onExpandedChange={(_, expanded) => {
                setIndexExpandedAccordion(expanded ? field.id : null);
              }}
              onChangeVisibility={(value) => {
                const newContent = [...formik.values.experiences];
                newContent[index].isHidden = value;
                formik.setFieldValue("experiences", newContent);
                formik.submitForm();
              }}
              onDelete={() => handleDeleteById(field.id)}
            >
              <ProjectForm
                formik={formik}
                field={field.content}
                index={index}
              />
            </SectionItemLayout>
          ))}
        </AccordionGroup>
      </SectionDroppableLayout>
    </>
  );
};
