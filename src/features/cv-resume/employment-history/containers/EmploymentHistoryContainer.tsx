import { Typography } from "@mui/joy";

import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { EmploymentHistoryForm } from "../components/EmploymentHistoryForm";

export const EmploymentHistoryContainer = () => {
  const { userData, formik } = useFormCV();

  return (
    <PageLayout title={"Employment History"}>
      {userData.data && <EmploymentHistoryForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
