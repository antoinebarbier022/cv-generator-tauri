import { Typography } from "@mui/joy";
import { ProfileForm } from "../components/form/ProfileForm";
import { useCVForm } from "../hooks/useCVForm";
import { PageLayout } from "../layouts/PageLayout";

export const ProfileContainer = () => {
  const { initialValues, formik } = useCVForm();

  return (
    <PageLayout title={"Profile"}>
      {initialValues ? (
        <ProfileForm formik={formik} />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </PageLayout>
  );
};
