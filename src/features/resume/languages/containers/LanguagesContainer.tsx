import { Typography } from "@mui/joy";

import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { LanguagesForm } from "../components/LanguagesForm";

export const LanguagesContainer = () => {
  const { userData, formik } = useFormCV();

  return (
    <PageLayout title={"Languages"}>
      {userData.data && <LanguagesForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
