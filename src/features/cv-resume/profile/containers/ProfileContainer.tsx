import { Typography } from "@mui/joy";

import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../cv-generation/hooks/useFormCV";
import { useGetImageProfileStorage } from "../../../storage/hooks/useGetImageProfileStorage";
import { ProfileForm } from "../components/ProfileForm";

export const ProfileContainer = () => {
  const { userData, formik } = useFormCV();
  const image = useGetImageProfileStorage();

  return (
    <PageLayout title={"Profile"}>
      {userData.data && <ProfileForm formik={formik} image={image.data} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
