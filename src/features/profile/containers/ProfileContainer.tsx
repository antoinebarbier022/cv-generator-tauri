import { Typography } from "@mui/joy";
import { PageLayout } from "../../../layouts/PageLayout";
import { useFormCV } from "../../cv-generation/hooks/useFormCV";
import { ProfileForm } from "../components/ProfileForm";

export const ProfileContainer = () => {
  const { userData, formik } = useFormCV();

  return (
    <PageLayout title={"Profile"}>
      {userData.data && <ProfileForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
