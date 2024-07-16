import { Typography } from "@mui/joy";

import { useTranslation } from "react-i18next";
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
  };

  return (
    <PageLayout
      title={t("resume.section.skills.title")}
      endDecorator={<IconButtonAdd onClick={handleAddSkill} />}
    >
      {userData.data && <SkillsForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
