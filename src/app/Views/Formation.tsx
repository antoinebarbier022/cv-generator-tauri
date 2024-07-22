import { AccordionGroup, Chip, Stack, Textarea, Typography } from "@mui/joy";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { AccordionCard } from "../../components/AccordionCard";
import { AccordionTitle } from "../../components/AccordionTitle";
import { EmptyState } from "../../components/EmptyState";
import { IconButtonAdd } from "../../components/IconButtonAdd";
import { CV_LANGUAGES } from "../../constants/languages";
import { useFormCV } from "../../features/storage/hooks/useFormCV";
import { PageLayout } from "../../layouts/PageLayout";

export const Formation = () => {
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

  const isEmptyData = userData.data && userData.data?.formation.length === 0;

  return (
    <DragDropContext onDragEnd={(result) => dragEnded(result, "formation")}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <PageLayout
            ref={provided.innerRef}
            {...provided.droppableProps}
            title={t("resume.section.formation.title")}
            endDecorator={
              <IconButtonAdd
                onClick={() => handleAddItemSection({ fieldName: "formation" })}
              />
            }
          >
            {userData.isPending && <Typography>Loading...</Typography>}
            {userData.isError && <Typography>Error.</Typography>}
            {isEmptyData ? (
              <EmptyState
                title={t("empty-state.formation.title")}
                description={t("empty-state.formation.description")}
                labelButton={t("empty-state.formation.button.label")}
                onClickButton={() =>
                  handleAddItemSection({ fieldName: "formation" })
                }
              />
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <AccordionGroup disableDivider>
                  {formik.values.formation?.map((field, index) => (
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
                              placeholder={`${t("input.formation.label")} ${
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
                              fieldName: "formation",
                              idSelected: field.id,
                            })
                          }
                        >
                          <Stack flex={1} gap={1} marginTop={1}>
                            {CV_LANGUAGES.map((lang) => (
                              <Textarea
                                key={`formation[${index}].content.${lang}`}
                                name={`formation[${index}].content.${lang}`}
                                startDecorator={<Chip>{lang}</Chip>}
                                value={field.content[lang as string]}
                                minRows={2}
                                maxRows={2}
                                onChange={formik.handleChange}
                                placeholder={t("input.formation.placeholder")}
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
