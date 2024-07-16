import { Typography } from "@mui/joy";

import { useTranslation } from "react-i18next";
import { IconButtonAdd } from "../../../../components/IconButtonAdd";
import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { UserDataExperience } from "../../../storage/types/storage";
import { ProjectsForm } from "../components/ProjectsForm";

export const ProjectsContainer = () => {
  const { t } = useTranslation();
  const { userData, formik } = useFormCV();

  const handleAddProject = () => {
    formik.setFieldValue("experiences", [
      ...(formik.values.experiences ?? []),
      {
        id: crypto.randomUUID(),
        client: "",
        program: "",
        role: "",
        date: "",
        context: {
          en: "",
          fr: "",
        },
        contribution: {
          en: "",
          fr: "",
        },
      } as UserDataExperience,
    ]);
  };

  return (
    <PageLayout
      title={t("resume.section.projects.title")}
      endDecorator={<IconButtonAdd onClick={handleAddProject} />}
    >
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
      {userData.data && <ProjectsForm formik={formik} />}
    </PageLayout>
  );
};
