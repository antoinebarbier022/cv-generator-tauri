import { Typography } from "@mui/joy";

import { useTranslation } from "react-i18next";
import { EmptyState } from "../../../../components/EmptyState";
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
      ...(formik.values.experiences ?? []),
    ]);
    formik.submitForm();
  };
  const isEmptyData = userData.data && userData.data?.experiences.length === 0;

  return (
    <PageLayout
      title={t("resume.section.projects.title")}
      endDecorator={<IconButtonAdd onClick={handleAddProject} />}
    >
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
      {isEmptyData ? (
        <EmptyState
          title={t("empty-state.project.title")}
          description={t("empty-state.project.description")}
          labelButton={t("empty-state.project.button.label")}
          onClickButton={handleAddProject}
        />
      ) : (
        <ProjectsForm formik={formik} />
      )}
    </PageLayout>
  );
};
