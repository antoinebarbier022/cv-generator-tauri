import { Typography } from "@mui/joy";
import { PageLayout } from "../../../layouts/PageLayout";
import { ProjectsForm } from "../components/ProjectsForm";
import { useCVForm } from "../hooks/useCVForm";

export const ProjectsContainer = () => {
  const { userData, formik } = useCVForm();

  return (
    <PageLayout title={"Projects"}>
      {userData.data && <ProjectsForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
