import { Typography } from "@mui/joy";
import { IconButtonAdd } from "../../../../components/IconButtonAdd";
import { PageLayout } from "../../../../layouts/PageLayout";
import { useFormCV } from "../../../storage/hooks/useFormCV";
import { FormationForm } from "../components/FormationForm";

export const FormationContainer = () => {
  const { userData, formik } = useFormCV();

  const handleAddFormation = () =>
    formik.setFieldValue("formations", [
      ...(formik.values.formations ?? []),
      "",
    ]);

  return (
    <PageLayout
      title={"Formation"}
      endDecorator={<IconButtonAdd onClick={handleAddFormation} />}
    >
      {userData.data && <FormationForm formik={formik} />}
      {userData.isPending && <Typography>Loading...</Typography>}
      {userData.isError && <Typography>Error.</Typography>}
    </PageLayout>
  );
};
