import { Typography } from "@mui/joy";

import { IconButtonAdd } from "../../../../components/IconButtonAdd";
import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { EmploymentHistoryForm } from "../components/EmploymentHistoryForm";

export const EmploymentHistoryContainer = () => {
  const { userData, formik } = useFormCV();

  const handleAddEmploymentHistory = () =>
    formik.setFieldValue("employment_history", [
      ...(formik.values.employment_history ?? []),
      "",
    ]);

  return (
    <PageLayout
      title={"Employment History"}
      endDecorator={<IconButtonAdd onClick={handleAddEmploymentHistory} />}
    >
      {userData.data && <EmploymentHistoryForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
