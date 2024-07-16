import { Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { IconButtonAdd } from "../../../../components/IconButtonAdd";
import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { FormationForm } from "../components/FormationForm";

export const FormationContainer = () => {
  const { t } = useTranslation();
  const { userData, formik } = useFormCV();

  const handleAddFormation = () =>
    formik.setFieldValue("formations", [
      ...(formik.values.formations ?? []),
      { fr: "", en: "" },
    ]);

  return (
    <PageLayout
      title={t("resume.section.formation.title")}
      endDecorator={<IconButtonAdd onClick={handleAddFormation} />}
    >
      {userData.data && <FormationForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
