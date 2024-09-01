import { AccordionGroup, Stack } from "@mui/joy";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AccordionTitle } from "../../components/AccordionTitle";
import { EmptyState } from "../../components/EmptyState";
import { useFormCV } from "../../features/form/hooks/useFormCV";
import { SectionItem } from "../../features/sections/containers/SectionItem";
import { SectionDroppableLayout } from "../../features/sections/layouts/SectionDroppableLayout";
import { Translation } from "../../features/storage/types/storage";

export const Skills = () => {
  const { t } = useTranslation();

  const sectionKey = "skills";

  const {
    userData,
    formik,
    handleAddItemSection,
    handleDeleteItemSection,
    dragEnded,
  } = useFormCV();

  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    string | null
  >(null);

  const handleChangeVisibility = (index: number, value: boolean) => {
    const newContent = [...formik.values[sectionKey]];
    newContent[index].isHidden = value;
    formik.setFieldValue(sectionKey, newContent);
    formik.submitForm();
  };

  const handleEditContentItem = (id: string, content: Translation) => {
    const newContent = [...formik.values[sectionKey]];
    newContent[newContent.findIndex((e) => e.id === id)].content = content;

    formik.setFieldValue(sectionKey, newContent);
    formik.submitForm();
  };

  const handleExpandedChange = (id: string, expanded: boolean) => {
    setIndexExpandedAccordion(expanded ? id : null);
  };

  const handleDelete = (id: string) =>
    handleDeleteItemSection({
      fieldName: sectionKey,
      idSelected: id,
    });

  const isEmpty = userData.data && userData.data[sectionKey].length === 0;

  return (
    <SectionDroppableLayout
      title={t("resume.section.skills.title")}
      chip={String(formik.values[sectionKey].length)}
      droppableId={"droppable"}
      onDragEnd={(result) => dragEnded(result, sectionKey)}
      onAddItem={() => handleAddItemSection({ fieldName: sectionKey })}
      isError={userData.isError}
      isEmpty={isEmpty}
      isLoading={userData.isPending}
      emptyContent={
        <EmptyState
          title={t("empty-state.skills.title")}
          description={t("empty-state.skills.description")}
          labelButton={t("empty-state.skills.button.label")}
          onClickButton={() => handleAddItemSection({ fieldName: sectionKey })}
        />
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <AccordionGroup disableDivider component={Stack}>
          {formik.values[sectionKey]?.map((field, index) => (
            <>
              <SectionItem
                content={field.content}
                id={field.id}
                placeholder={""}
                key={field.id}
                index={index}
                draggableId={field.id}
                title={
                  <AccordionTitle
                    isWarningIcon={Boolean(
                      (field.content.fr && !field.content.en) ||
                        (!field.content.fr && field.content.en)
                    )}
                    content={
                      Boolean(field.content.fr)
                        ? field.content.fr
                        : field.content.en
                    }
                    placeholder={`${t("input.skill.label")} ${index + 1}`}
                  />
                }
                isVisible={Boolean(field.isHidden)}
                isExpanded={indexExpandedAccordion === field.id}
                onChangeVisibility={(value) =>
                  handleChangeVisibility(index, value)
                }
                onExpandedChange={(_, expanded) => {
                  handleExpandedChange(field.id, expanded);
                }}
                onDelete={() => handleDelete(field.id)}
                onSubmit={(value) => {
                  handleEditContentItem(value.id, value.content);
                }}
              />
            </>
          ))}
        </AccordionGroup>
      </form>
    </SectionDroppableLayout>
  );
};
