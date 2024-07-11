import { Typography } from "@mui/joy";

import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { useSetImageProfileStorage } from "../../../storage/hooks/useSetImageProfileStorage";
import { ProfileForm } from "../components/ProfileForm";

export const ProfileContainer = () => {
  const { userData, formik } = useFormCV();

  const mutationPicture = useSetImageProfileStorage();

  const handleChangePicture = () => {
    mutationPicture.mutate();
  };

  return (
    <PageLayout title={"Profile"}>
      {userData.data && (
        <ProfileForm
          formik={formik}
          onClickUploadPicture={handleChangePicture}
        />
      )}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
