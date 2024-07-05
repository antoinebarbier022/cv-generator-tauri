import { Typography } from "@mui/joy";
import { PageLayout } from "../../../layouts/PageLayout";
import { useFormCV } from "../../cv-generation/hooks/useFormCV";
import { SkillsForm } from "../components/SkillsForm";

export const SkillsContainer = () => {
  const { userData, formik } = useFormCV();

  return (
    <PageLayout title={"Skills"}>
      {userData.data && <SkillsForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
