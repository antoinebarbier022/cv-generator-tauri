import { AccordionGroup, Chip, Input, Stack } from "@mui/joy";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AccordionTitle } from "../../components/AccordionTitle";
import { EmptyState } from "../../components/EmptyState";
import { CV_LANGUAGES } from "../../features/form/constants/cv-languages";
import { useFormCV } from "../../features/form/hooks/useFormCV";
import { SectionItem } from "../../features/sections/containers/SectionItem";
import { SectionDroppableLayout } from "../../features/sections/layouts/SectionDroppableLayout";

export const Skills = () => {
  const { t } = useTranslation();
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
    const newContent = [...formik.values.skills];
    newContent[index].isHidden = value;
    formik.setFieldValue("skills", newContent);
    formik.submitForm();
  };

  const handleExpandedChange = (id: string, expanded: boolean) => {
    setIndexExpandedAccordion(expanded ? id : null);
  };

  const handleDelete = (id: string) =>
    handleDeleteItemSection({
      fieldName: "skills",
      idSelected: id,
    });

  const isEmpty = userData.data && userData.data?.skills.length === 0;

  return (
    <SectionDroppableLayout
      title={t("resume.section.skills.title")}
      chip={String(formik.values.skills.length)}
      droppableId={"droppable"}
      onDragEnd={(result) => dragEnded(result, "skills")}
      onAddItem={() => handleAddItemSection({ fieldName: "skills" })}
      isError={userData.isError}
      isEmpty={isEmpty}
      isLoading={userData.isPending}
      emptyContent={
        <EmptyState
          title={t("empty-state.skills.title")}
          description={t("empty-state.skills.description")}
          labelButton={t("empty-state.skills.button.label")}
          onClickButton={() => handleAddItemSection({ fieldName: "skills" })}
        />
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <AccordionGroup disableDivider component={Stack}>
          {formik.values.skills?.map((field, index) => (
            <>
              <SectionItem
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
              >
                <Stack flex={1} gap={1} marginTop={1}>
                  {CV_LANGUAGES.map((lang) => (
                    <Input
                      key={`skills[${index}].content.${lang}`}
                      name={`skills[${index}].content.${lang}`}
                      startDecorator={
                        <Chip
                          sx={{
                            marginLeft: -0.75,
                          }}
                        >
                          {lang}
                        </Chip>
                      }
                      value={field.content[lang as string]}
                      onChange={formik.handleChange}
                      placeholder=""
                    />
                  ))}
                </Stack>
              </SectionItem>
            </>
          ))}
        </AccordionGroup>
      </form>
    </SectionDroppableLayout>
  );
};
