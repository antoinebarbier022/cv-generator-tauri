import { Typography } from "@mui/joy";
import { PageLayout } from "../../../layouts/PageLayout";
import { FormationForm } from "../components/FormationForm";
import { useCVForm } from "../hooks/useCVForm";

export const FormationContainer = () => {
  const { userData, formik } = useCVForm();

  return (
    <PageLayout title={"Formation"}>
      {userData.data && <FormationForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
