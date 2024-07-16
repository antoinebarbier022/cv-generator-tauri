import { Typography } from "@mui/joy";

import { useTranslation } from "react-i18next";
import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { useSetImageProfileStorage } from "../../../storage/hooks/useSetImageProfileStorage";
import { ProfileForm } from "../components/ProfileForm";

export const ProfileContainer = () => {
  const { t } = useTranslation();
  const { userData, formik } = useFormCV();

  const mutationPicture = useSetImageProfileStorage();

  const handleChangePicture = () => {
    mutationPicture.mutate();
  };

  return (
    <PageLayout title={t("resume.section.profile.title")}>
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
