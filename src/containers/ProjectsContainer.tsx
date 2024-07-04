import { Typography } from "@mui/joy";
import { ProjectsForm } from "../components/form/ProjectsForm";
import { useCVForm } from "../hooks/useCVForm";
import { PageLayout } from "../layouts/PageLayout";

export const ProjectsContainer = () => {
  const { initialValues, formik } = useCVForm();

  return (
    <PageLayout title={"Projects"}>
      {initialValues ? (
        <ProjectsForm formik={formik} />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </PageLayout>
  );
};
