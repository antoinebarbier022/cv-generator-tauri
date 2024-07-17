import { Typography } from "@mui/joy";

import { useTranslation } from "react-i18next";
import { PageLayout } from "../../../../layouts/PageLayout";
import { useDeleteImageProfileStorage } from "../../../storage/hooks/useDeleteImageProfileStorage";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { useSetImageProfileStorage } from "../../../storage/hooks/useSetImageProfileStorage";
import { ProfileForm } from "../components/ProfileForm";

export const ProfileContainer = () => {
  const { t } = useTranslation();
  const { userData, formik } = useFormCV();

  const mutationReplacePicture = useSetImageProfileStorage();
  const mutationDeletePicture = useDeleteImageProfileStorage();

  const handleChangePicture = () => {
    mutationReplacePicture.mutate(undefined, {
      onSuccess: () => formik.submitForm(),
    });
  };

  const handleDeletePicture = () => {
    mutationDeletePicture.mutate(undefined, {
      onSuccess: () => formik.submitForm(),
    });
  };

  return (
    <PageLayout title={t("resume.section.profile.title")}>
      {userData.data && (
        <ProfileForm
          formik={formik}
          onUploadPicture={handleChangePicture}
          onDeletePicture={handleDeletePicture}
        />
      )}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
