import { Typography } from "@mui/joy";

import { IconButtonAdd } from "../../../../components/IconButtonAdd";
import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { LanguagesForm } from "../components/LanguagesForm";

export const LanguagesContainer = () => {
  const { userData, formik } = useFormCV();

  const handleAddLanguage = () =>
    formik.setFieldValue("languages", [...(formik.values.languages ?? []), ""]);

  return (
    <PageLayout
      title={"Languages"}
      endDecorator={<IconButtonAdd onClick={handleAddLanguage} />}
    >
      {userData.data && <LanguagesForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
