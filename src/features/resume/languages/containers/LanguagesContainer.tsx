import { Typography } from "@mui/joy";

import { useTranslation } from "react-i18next";
import { EmptyState } from "../../../../components/EmptyState";
import { IconButtonAdd } from "../../../../components/IconButtonAdd";
import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { LanguagesForm } from "../components/LanguagesForm";

export const LanguagesContainer = () => {
  const { t } = useTranslation();
  const { userData, formik } = useFormCV();

  const handleAddLanguage = () =>
    formik.setFieldValue("languages", [
      ...(formik.values.languages ?? []),
      { fr: "", en: "" },
    ]);

  const isEmptyData = userData.data && userData.data?.languages.length === 0;

  return (
    <PageLayout
      title={t("resume.section.languages.title")}
      endDecorator={<IconButtonAdd onClick={handleAddLanguage} />}
    >
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
      {isEmptyData ? (
        <EmptyState
          title={t("empty-state.languages.title")}
          description={t("empty-state.languages.description")}
          labelButton={t("empty-state.languages.button.label")}
          onClickButton={handleAddLanguage}
        />
      ) : (
        <LanguagesForm formik={formik} />
      )}
    </PageLayout>
  );
};
