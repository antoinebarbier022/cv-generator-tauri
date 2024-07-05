import { Typography } from "@mui/joy";
import { PageLayout } from "../../../layouts/PageLayout";
import { ProfileForm } from "../components/ProfileForm";
import { useCVForm } from "../hooks/useCVForm";

export const ProfileContainer = () => {
  const { userData, formik } = useCVForm();

  return (
    <PageLayout title={"Profile"}>
      {userData.data && <ProfileForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
