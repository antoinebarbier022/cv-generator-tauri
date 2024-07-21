import {
  AccordionGroup,
  Box,
  Chip,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";

import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { AccordionCard } from "../../components/AccordionCard";
import { AccordionTitle } from "../../components/AccordionTitle";
import { EmptyState } from "../../components/EmptyState";
import { IconButtonAdd } from "../../components/IconButtonAdd";
import { CV_LANGUAGES } from "../../constants/languages";
import { useFormCV } from "../../features/storage/hooks/useFormCV";
import { PageLayout } from "../../layouts/PageLayout";
import { reorderListSection } from "../../utils/drag-and-drop.utils";

export const EmploymentHistory = () => {
  const { userData, formik, handleAddItemSection } = useFormCV();
  const { t } = useTranslation();

  const dragEnded: OnDragEndResponder = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = reorderListSection(
      formik.values.employment_history,
      result.source.index,
      result.destination.index
    );

    formik.setFieldValue("employment_history", items);
    formik.submitForm();
  };

  const isEmptyData =
    userData.data && userData.data?.employment_history.length === 0;

  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    string | null
  >(null);

  const handleDelete = ({ index }: { index: number }) => {
    formik.setFieldValue("employment_history", [
      ...(formik.values.employment_history?.filter((_, i) => i !== index) ??
        []),
    ]);
    formik.submitForm();
  };

  return (
    <DragDropContext onDragEnd={dragEnded}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <Box
            height={"100%"}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <PageLayout
              title={t("resume.section.employment-history.title")}
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
                          <Stack direction="row" width={"100%"} key={index}>
                            <AccordionCard
                              index={index}
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
                              onDelete={() => handleDelete({ index })}
                            >
                              <Stack flex={1} gap={1} marginTop={1}>
                                {CV_LANGUAGES.map((lang) => (
                                  <Textarea
                                    key={`employment_history[${index}].content.${lang}`}
                                    name={`employment_history[${index}].content.${lang}`}
                                    startDecorator={<Chip>{lang}</Chip>}
                                    minRows={2}
                                    maxRows={4}
                                    value={field.content[lang as string]}
                                    onChange={formik.handleChange}
                                    placeholder={t(
                                      "input.employment-history.placeholder"
                                    )}
                                  />
                                ))}
                              </Stack>
                            </AccordionCard>
                          </Stack>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </AccordionGroup>
                </form>
              )}
            </PageLayout>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
