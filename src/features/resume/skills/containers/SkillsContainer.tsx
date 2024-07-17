import { Typography } from "@mui/joy";

import { useTranslation } from "react-i18next";
import { EmptyState } from "../../../../components/EmptyState";
import { IconButtonAdd } from "../../../../components/IconButtonAdd";
import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { SkillsForm } from "../components/SkillsForm";

export const SkillsContainer = () => {
  const { t } = useTranslation();
  const { userData, formik } = useFormCV();

  const handleAddSkill = () => {
    formik.setFieldValue("skills", [
      ...(formik.values.skills ?? []),
      { fr: "", en: "" },
    ]);
    formik.submitForm();
  };

  const isEmptyData = userData.data && userData.data?.skills.length === 0;

  return (
    <PageLayout
      title={t("resume.section.skills.title")}
      endDecorator={<IconButtonAdd onClick={handleAddSkill} />}
    >
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
      {isEmptyData ? (
        <EmptyState
          title={t("empty-state.skills.title")}
          description={t("empty-state.skills.description")}
          labelButton={t("empty-state.skills.button.label")}
          onClickButton={handleAddSkill}
        />
      ) : (
        <SkillsForm formik={formik} />
      )}
    </PageLayout>
  );
};
