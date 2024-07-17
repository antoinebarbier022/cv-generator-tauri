import { Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../../../../components/EmptyState";
import { IconButtonAdd } from "../../../../components/IconButtonAdd";
import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { FormationForm } from "../components/FormationForm";

export const FormationContainer = () => {
  const { t } = useTranslation();
  const { userData, formik } = useFormCV();

  const handleAddFormation = () => {
    formik.setFieldValue("formations", [
      ...(formik.values.formations ?? []),
      { fr: "", en: "" },
    ]);
    formik.submitForm();
  };

  const isEmptyData = userData.data && userData.data?.formations.length === 0;

  return (
    <PageLayout
      title={t("resume.section.formation.title")}
      endDecorator={<IconButtonAdd onClick={handleAddFormation} />}
    >
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
      {isEmptyData ? (
        <EmptyState
          title={t("empty-state.formation.title")}
          description={t("empty-state.formation.description")}
          labelButton={t("empty-state.formation.button.label")}
          onClickButton={handleAddFormation}
        />
      ) : (
        <FormationForm formik={formik} />
      )}
    </PageLayout>
  );
};
