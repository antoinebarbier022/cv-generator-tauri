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

export const Sectors = () => {
  const { t } = useTranslation();
  const {
    userData,
    formik,
    handleAddItemSection,
    handleDeleteItemSection,
    dragEnded,
    isEmpty,
  } = useFormCV();

  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    string | null
  >(null);

  const isEmptyData = userData.data && userData.data?.sectors.length === 0;

  return (
    <DragDropContext onDragEnd={(result) => dragEnded(result, "sectors")}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <PageLayout
            ref={provided.innerRef}
            {...provided.droppableProps}
            title={t("resume.section.sectors.title")}
            chip={String(formik.values.sectors.length)}
            endDecorator={
              <IconButtonAdd
                onClick={() => handleAddItemSection({ fieldName: "sectors" })}
              />
            }
          >
            {userData.isPending && <Typography>Loading...</Typography>}
            {userData.isError && <Typography>Error.</Typography>}
            {isEmptyData ? (
              <EmptyState
                title={t("empty-state.sectors.title")}
                description={t("empty-state.sectors.description")}
                labelButton={t("empty-state.sectors.button.label")}
                onClickButton={() =>
                  handleAddItemSection({ fieldName: "sectors" })
                }
              />
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <AccordionGroup disableDivider component={Stack}>
                  {formik.values.sectors?.map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
                      index={index}
                    >
                      {(_provided) => (
                        <AccordionCard
                          onChangeHidden={(value) => {
                            const newContent = [...formik.values.sectors];
                            newContent[index].isHidden = value;
                            formik.setFieldValue("sectors", newContent);
                            formik.submitForm();
                          }}
                          isHidden={field.isHidden}
                          key={field.id}
                          indexCount={index}
                          isEmpty={isEmpty(field.content)}
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
                              placeholder={`${t("input.sector.label")} ${
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
                              fieldName: "sectors",
                              idSelected: field.id,
                            })
                          }
                        >
                          <Stack flex={1} gap={1} marginTop={1}>
                            {CV_LANGUAGES.map((lang) => (
                              <Input
                                key={`sectors[${index}].content.${lang}`}
                                name={`sectors[${index}].content.${lang}`}
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
