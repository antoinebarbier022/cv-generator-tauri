import { AccordionGroup, Stack } from "@mui/joy";

import { useTranslation } from "react-i18next";
import { EmptyState } from "../../components/EmptyState";

import { ProjectItem } from "../../features/cv-resume/containers/ProjectItem";
import { useFormCV } from "../../features/cv-resume/hooks/useFormCV";
import { SectionDroppableLayout } from "../../features/cv-resume/layouts/SectionDroppableLayout";
import {
  ResumeContentSection,
  UserDataExperience,
} from "../../features/cv-resume/types/storage";

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

  const handleDeleteById = (id: string) => {
    handleDeleteItemSection({ fieldName: "experiences", idSelected: id });
  };

  const handleEditContentItem = (
    data: ResumeContentSection<UserDataExperience>
  ) => {
    const newContent = [...formik.values["experiences"]];
    const indexNewContent = newContent.findIndex((e) => e.id === data.id);
    newContent[indexNewContent] = { ...data };

    formik.setFieldValue("experiences", newContent);
    formik.submitForm();
  };

  const handleChangeVisibility = (index: number, value: boolean) => {
    const newContent = [...formik.values["experiences"]];
    newContent[index].isHidden = value;
    formik.setFieldValue("experiences", newContent);
    formik.submitForm();
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
            <ProjectItem
              index={index}
              key={field.id}
              data={field}
              draggableId={field.id}
              isVisible={Boolean(field.isHidden)}
              onChangeVisibility={(value) =>
                handleChangeVisibility(index, value)
              }
              onDelete={() => handleDeleteById(field.id)}
              onChange={(value) => {
                handleEditContentItem(value);
              }}
            />
          ))}
        </AccordionGroup>
      </SectionDroppableLayout>
    </>
  );
};
