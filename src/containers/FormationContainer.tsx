import { Typography } from "@mui/joy";
import { FormationForm } from "../components/form/FormationForm";
import { useCVForm } from "../hooks/useCVForm";
import { PageLayout } from "../layouts/PageLayout";

export const FormationContainer = () => {
  const { initialValues, formik } = useCVForm();

  return (
    <PageLayout title={"Formation"}>
      {initialValues ? (
        <FormationForm formik={formik} />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </PageLayout>
  );
};
