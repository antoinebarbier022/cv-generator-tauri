import { AccordionGroup, Stack } from "@mui/joy";

import { useTranslation } from "react-i18next";
import { AccordionTitle } from "../../components/AccordionTitle";
import { EmptyState } from "../../components/EmptyState";

import { useFormCV } from "../../features/form/hooks/useFormCV";
import { ProjectTitle } from "../../features/sections/components/ProjectTitle";
import { ProjectForm } from "../../features/sections/containers/ProjectForm";
import { SectionDroppableLayout } from "../../features/sections/layouts/SectionDroppableLayout";
import { SectionItemLayout } from "../../features/sections/layouts/SectionItemLayout";
import { useExpandedItemStore } from "../../features/sections/stores/useExpandedItemStore";
import {
  ResumeContentSection,
  UserDataExperience,
} from "../../features/storage/types/storage";

export const Projects = () => {
  const { t } = useTranslation();
  const {
    userData,
    formik,
    dragEnded,
    handleDeleteItemSection,
    handleAddItemSection,
  } = useFormCV();

  const handleAddProject = () => {
    handleAddItemSection({ fieldName: "experiences" });
  };
  const isEmptyData = userData.data && userData.data?.experiences.length === 0;

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

  const handleEditContentItem = (
    data: ResumeContentSection<UserDataExperience>
  ) => {
    const newContent = [...formik.values["experiences"]];
    newContent[newContent.findIndex((e) => e.id === data.id)] = data;

    formik.setFieldValue("experiences", newContent);
    formik.submitForm();
  };

  const { expandedItem, setExpandedItem } = useExpandedItemStore();

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
              isExpanded={expandedItem === field.id}
              onExpandedChange={(_, expanded) => {
                setExpandedItem(expanded ? field.id : undefined);
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
                data={field}
                onChange={(value) => handleEditContentItem(value)}
              />
            </SectionItemLayout>
          ))}
        </AccordionGroup>
      </SectionDroppableLayout>
    </>
  );
};
