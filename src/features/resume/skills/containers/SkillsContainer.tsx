import { Typography } from "@mui/joy";

import { IconButtonAdd } from "../../../../components/IconButtonAdd";
import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { SkillsForm } from "../components/SkillsForm";

export const SkillsContainer = () => {
  const { userData, formik } = useFormCV();

  const handleAddSkill = () =>
    formik.setFieldValue("skills", [...(formik.values.skills ?? []), ""]);

  return (
    <PageLayout
      title={"Skills"}
      endDecorator={<IconButtonAdd onClick={handleAddSkill} />}
    >
      {userData.data && <SkillsForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
