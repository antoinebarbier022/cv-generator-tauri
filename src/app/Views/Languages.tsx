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

export const Languages = () => {
  const { t } = useTranslation();
  const { userData, formik, handleAddItemSection, handleDeleteItemSection } =
    useFormCV();

  const [indexExpandedAccordion, setIndexExpandedAccordion] = useState<
    string | null
  >(null);

  const isEmptyData = userData.data && userData.data?.languages.length === 0;

  return (
    <PageLayout
      title={t("resume.section.languages.title")}
      endDecorator={
        <IconButtonAdd
          onClick={() => handleAddItemSection({ fieldName: "languages" })}
        />
      }
    >
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
      {isEmptyData ? (
        <EmptyState
          title={t("empty-state.languages.title")}
          description={t("empty-state.languages.description")}
          labelButton={t("empty-state.languages.button.label")}
          onClickButton={() => handleAddItemSection({ fieldName: "languages" })}
        />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <AccordionGroup disableDivider component={Stack}>
            {formik.values.languages?.map((field, index) => (
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
                      placeholder={`${t("input.language.label")} ${index + 1}`}
                    />
                  }
                  expanded={indexExpandedAccordion === field.id}
                  onExpandedChange={(_, expanded) => {
                    setIndexExpandedAccordion(expanded ? field.id : null);
                  }}
                  onDelete={() =>
                    handleDeleteItemSection({
                      fieldName: "languages",
                      idSelected: field.id,
                    })
                  }
                >
                  <Stack flex={1} gap={1} marginTop={1}>
                    {CV_LANGUAGES.map((lang) => (
                      <Input
                        key={`languages[${index}].content.${lang}`}
                        name={`languages[${index}].content.${lang}`}
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
                        placeholder={t("input.language.placeholder")}
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
