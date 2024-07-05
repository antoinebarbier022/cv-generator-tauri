import { Typography } from "@mui/joy";
import { PageLayout } from "../../../layouts/PageLayout";
import { EmploymentHistoryForm } from "../components/EmploymentHistoryForm";
import { useCVForm } from "../hooks/useCVForm";

export const EmploymentHistoryContainer = () => {
  const { userData, formik } = useCVForm();

  return (
    <PageLayout title={"Employment History"}>
      {userData.data && <EmploymentHistoryForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
