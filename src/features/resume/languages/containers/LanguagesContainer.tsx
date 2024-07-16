import { Typography } from "@mui/joy";

import { useTranslation } from "react-i18next";
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

  return (
    <PageLayout
      title={t("resume.section.languages.title")}
      endDecorator={<IconButtonAdd onClick={handleAddLanguage} />}
    >
      {userData.data && <LanguagesForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
