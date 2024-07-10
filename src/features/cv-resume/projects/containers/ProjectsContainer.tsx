import { Typography } from "@mui/joy";

import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../cv-generation/hooks/useFormCV";
import { ProjectsForm } from "../components/ProjectsForm";

export const ProjectsContainer = () => {
  const { userData, formik } = useFormCV();

  return (
    <PageLayout title={"Projects"}>
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
      {userData.data && <ProjectsForm formik={formik} />}
    </PageLayout>
  );
};
