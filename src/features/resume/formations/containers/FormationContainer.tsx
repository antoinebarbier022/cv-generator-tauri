import { Typography } from "@mui/joy";
import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../cv-generation/hooks/useFormCV";
import { FormationForm } from "../components/FormationForm";

export const FormationContainer = () => {
  const { userData, formik } = useFormCV();

  return (
    <PageLayout title={"Formation"}>
      {userData.data && <FormationForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
