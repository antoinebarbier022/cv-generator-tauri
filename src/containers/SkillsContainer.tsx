import { Typography } from "@mui/joy";
import { SkillsForm } from "../components/form/SkillsForm";
import { useCVForm } from "../hooks/useCVForm";
import { PageLayout } from "../layouts/PageLayout";

export const SkillsContainer = () => {
  const { initialValues, formik } = useCVForm();

  return (
    <PageLayout title={"Skills"}>
      {initialValues ? (
        <SkillsForm formik={formik} />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </PageLayout>
  );
};
