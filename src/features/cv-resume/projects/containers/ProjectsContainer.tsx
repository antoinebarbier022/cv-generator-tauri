import { Typography } from "@mui/joy";

import { PageLayout } from "../../../../layouts/PageLayout";
import { ProjectsForm } from "../../../resume/projects/components/ProjectsForm";
import { useFormCV } from "../../../storage/hooks/useFormCV";

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
