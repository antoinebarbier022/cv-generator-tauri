import { Typography } from "@mui/joy";
import { EmploymentHistoryForm } from "../components/EmploymentHistoryForm";
import { useCVForm } from "../hooks/useCVForm";
import { PageLayout } from "../layouts/PageLayout";

export const EmploymentHistoryContainer = () => {
  const { initialValues, formik } = useCVForm();

  return (
    <PageLayout title={"Employment History"}>
      {initialValues ? (
        <EmploymentHistoryForm formik={formik} />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </PageLayout>
  );
};
