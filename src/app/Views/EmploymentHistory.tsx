import { AccordionGroup, Chip, Stack, Textarea, Typography } from "@mui/joy";

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

export const EmploymentHistory = () => {
  const {
    userData,
    formik,
    handleAddItemSection,
    handleDeleteItemSection,
    dragEnded,
    isEmpty,
  } = useFormCV();
  const { t } = useTranslation();

  const isEmptyData =
    userData.data && userData.data?.employment_history.length === 0;

  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    string | null
  >(null);

  return (
    <DragDropContext
      onDragEnd={(result) => dragEnded(result, "employment_history")}
    >
      <Droppable droppableId="droppable">
        {(provided) => (
          <PageLayout
            ref={provided.innerRef}
            {...provided.droppableProps}
            title={t("resume.section.employment-history.title")}
            chip={String(formik.values.employment_history.length)}
            endDecorator={
              <IconButtonAdd
                onClick={() =>
                  handleAddItemSection({ fieldName: "employment_history" })
                }
              />
            }
          >
            {userData.isPending && <Typography>Loading...</Typography>}
            {userData.isError && <Typography>Error.</Typography>}
            {isEmptyData ? (
              <EmptyState
                title={t("empty-state.employment-history.title")}
                description={t("empty-state.employment-history.description")}
                labelButton={t("empty-state.employment-history.button.label")}
                onClickButton={() =>
                  handleAddItemSection({ fieldName: "employment_history" })
                }
              />
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <AccordionGroup disableDivider component={Stack}>
                  {formik.values.employment_history?.map((field, index) => (
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
                          isEmpty={isEmpty(field.content)}
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
                              placeholder={`${t(
                                "input.employment-history.label"
                              )} ${index + 1}`}
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
                              fieldName: "employment_history",
                              idSelected: field.id,
                            })
                          }
                        >
                          <Stack flex={1} gap={1} marginTop={1}>
                            {CV_LANGUAGES.map((lang) => (
                              <Textarea
                                key={`employment_history[${index}].content.${lang}`}
                                name={`employment_history[${index}].content.${lang}`}
                                startDecorator={<Chip>{lang}</Chip>}
                                minRows={2}
                                maxRows={2}
                                value={field.content[lang as string]}
                                onChange={formik.handleChange}
                                placeholder={t(
                                  "input.employment-history.placeholder"
                                )}
                                slotProps={{
                                  endDecorator: {
                                    sx: {
                                      alignSelf: "flex-end",
                                    },
                                  },
                                }}
                                endDecorator={
                                  <Typography
                                    level="body-xs"
                                    textColor={"neutral.500"}
                                    sx={{ ml: "auto" }}
                                  >
                                    <Typography
                                      textColor={
                                        formik.values.employment_history[index]
                                          .content[lang].length > 55
                                          ? "danger.400"
                                          : "neutral.400"
                                      }
                                    >
                                      {
                                        formik.values.employment_history[index]
                                          .content[lang].length
                                      }
                                    </Typography>{" "}
                                    / {55}
                                  </Typography>
                                }
                              />
                            ))}
                          </Stack>
                        </AccordionCard>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </AccordionGroup>
              </form>
            )}
          </PageLayout>
        )}
      </Droppable>
    </DragDropContext>
  );
};
