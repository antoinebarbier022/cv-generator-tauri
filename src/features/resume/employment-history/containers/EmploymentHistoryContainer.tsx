import { Typography } from "@mui/joy";

import { useTranslation } from "react-i18next";
import { EmptyState } from "../../../../components/EmptyState";
import { IconButtonAdd } from "../../../../components/IconButtonAdd";
import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { EmploymentHistoryForm } from "../components/EmploymentHistoryForm";

export const EmploymentHistoryContainer = () => {
  const { userData, formik } = useFormCV();
  const { t } = useTranslation();

  const handleAddEmploymentHistory = () =>
    formik.setFieldValue("employment_history", [
      ...(formik.values.employment_history ?? []),
      { fr: "", en: "" },
    ]);

  const isEmptyData =
    userData.data && userData.data?.employment_history.length === 0;

  return (
    <PageLayout
      title={t("resume.section.employment-history.title")}
      endDecorator={<IconButtonAdd onClick={handleAddEmploymentHistory} />}
    >
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
      {isEmptyData ? (
        <EmptyState
          title={t("empty-state.employment-history.title")}
          description={t("empty-state.employment-history.description")}
          labelButton={t("empty-state.employment-history.button.label")}
          onClickButton={handleAddEmploymentHistory}
        />
      ) : (
        <EmploymentHistoryForm formik={formik} />
      )}
    </PageLayout>
  );
};
