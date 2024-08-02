import { AccordionGroup, Chip, Input, Stack, Typography } from "@mui/joy";

import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { AccordionCard } from "../../components/AccordionCard";
import { AccordionTitle } from "../../components/AccordionTitle";
import { EmptyState } from "../../components/EmptyState";
import { IconButtonAdd } from "../../components/IconButtonAdd";
import { CV_LANGUAGES } from "../../features/form/constants/cv-languages";
import { useFormCV } from "../../features/form/hooks/useFormCV";
import { PageLayout } from "../../layouts/page-layout";

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

  const isEmptyData = userData.data && userData.data?.skills.length === 0;

  return (
    <DragDropContext onDragEnd={(result) => dragEnded(result, "skills")}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <PageLayout
            ref={provided.innerRef}
            {...provided.droppableProps}
            title={t("resume.section.skills.title")}
            chip={String(formik.values.skills.length)}
            endDecorator={
              <IconButtonAdd
                onClick={() => handleAddItemSection({ fieldName: "skills" })}
              />
            }
          >
            {userData.isPending && <Typography>Loading...</Typography>}
            {userData.isError && <Typography>Error.</Typography>}
            {isEmptyData ? (
              <EmptyState
                title={t("empty-state.skills.title")}
                description={t("empty-state.skills.description")}
                labelButton={t("empty-state.skills.button.label")}
                onClickButton={() =>
                  handleAddItemSection({ fieldName: "skills" })
                }
              />
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <AccordionGroup disableDivider component={Stack}>
                  {formik.values.skills?.map((field, index) => (
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
                              isWarningIcon={Boolean(
                                (field.content.fr && !field.content.en) ||
                                  (!field.content.fr && field.content.en)
                              )}
                              content={
                                Boolean(field.content.fr)
                                  ? field.content.fr
                                  : field.content.en
                              }
                              placeholder={`${t("input.skill.label")} ${
                                index + 1
                              }`}
                            />
                          }
                          expanded={indexExpandedAccordion === field.id}
                          onExpandedChange={(_, expanded) => {
                            setIndexExpandedAccordion(
                              expanded ? field.id : null
                            );
                          }}
                          onDelete={() =>
                            handleDeleteItemSection({
                              fieldName: "skills",
                              idSelected: field.id,
                            })
                          }
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
                                slotProps={{
                                  input: {
                                    maxLength: 50,
                                  },
                                }}
                                value={field.content[lang as string]}
                                onChange={formik.handleChange}
                                placeholder=""
                              />
                            ))}
                          </Stack>
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
