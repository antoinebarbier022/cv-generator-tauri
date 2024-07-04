import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { Button, IconButton, Input, Stack } from "@mui/joy";
import { FormikProps } from "formik";
import { UserData } from "../../pages/TestPage";

interface Props {
  formik: FormikProps<UserData>;
}
export const EmploymentHistoryForm = ({ formik }: Props) => {
  return (
    <Stack component="form" gap={4} onSubmit={formik.handleSubmit}>
      <Stack gap={2}>
        <Button
          size="sm"
          variant="outlined"
          startDecorator={<AddRounded />}
          disabled={Boolean(formik.errors.employment_history)}
          onClick={() =>
            formik.setFieldValue("employment_history", [
              ...(formik.values.employment_history ?? []),
              "",
            ])
          }
        >
          Add Employment History
        </Button>
        <Stack>
          {formik.values.employment_history?.map((field, index) => (
            <Stack direction="row" key={index}>
              <Input
                size="sm"
                name={`employment_history[${index}].fr`}
                placeholder="Employment"
                value={field.fr}
                onChange={formik.handleChange}
                autoComplete="off"
                error={
                  formik.touched.employment_history &&
                  Boolean(formik.errors.employment_history)
                }
                sx={{
                  borderEndEndRadius: 0,
                  borderStartEndRadius: 0,
                  borderRight: 0,
                  width: "30ch",
                }}
              />

              <IconButton
                color="primary"
                size="sm"
                variant="solid"
                onClick={() =>
                  formik.setFieldValue("employment_history", [
                    ...(formik.values.employment_history?.filter(
                      (_, i) => i !== index
                    ) ?? []),
                  ])
                }
                sx={{ borderEndStartRadius: 0, borderStartStartRadius: 0 }}
              >
                <RemoveRounded />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
