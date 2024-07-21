import { AccordionGroup, Chip, Input, Stack, Typography } from "@mui/joy";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AccordionCard } from "../../components/AccordionCard";
import { AccordionTitle } from "../../components/AccordionTitle";
import { EmptyState } from "../../components/EmptyState";
import { IconButtonAdd } from "../../components/IconButtonAdd";
import { CV_LANGUAGES } from "../../constants/languages";
import { useFormCV } from "../../features/storage/hooks/useFormCV";
import { PageLayout } from "../../layouts/PageLayout";

export const Skills = () => {
  const { t } = useTranslation();
  const { userData, formik, handleAddItemSection, handleDeleteItemSection } =
    useFormCV();

  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    string | null
  >(null);

  const isEmptyData = userData.data && userData.data?.skills.length === 0;

  return (
    <PageLayout
      title={t("resume.section.skills.title")}
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
          onClickButton={() => handleAddItemSection({ fieldName: "skills" })}
        />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <AccordionGroup disableDivider component={Stack}>
            {formik.values.skills?.map((field, index) => (
              <Stack direction="row" width={"100%"} key={index}>
                <AccordionCard
                  index={index}
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
                  expanded={indexExpandedAccordion === field.id}
                  onExpandedChange={(_, expanded) => {
                    setIndexExpandedAccordion(expanded ? field.id : null);
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
                        value={field.content[lang as string]}
                        onChange={formik.handleChange}
                        placeholder=""
                      />
                    ))}
                  </Stack>
                </AccordionCard>
              </Stack>
            ))}
          </AccordionGroup>
        </form>
      )}
    </PageLayout>
  );
};
