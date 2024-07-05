import { Typography } from "@mui/joy";
import { PageLayout } from "../../../layouts/PageLayout";
import { SkillsForm } from "../components/SkillsForm";
import { useCVForm } from "../hooks/useCVForm";

export const SkillsContainer = () => {
  const { userData, formik } = useCVForm();

  return (
    <PageLayout title={"Skills"}>
      {userData.data && <SkillsForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
