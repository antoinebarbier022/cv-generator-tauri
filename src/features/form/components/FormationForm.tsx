import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { Button, IconButton, Input, Stack } from "@mui/joy";
import { FormikProps } from "formik";
import { UserData } from "../../storage/types/storage";

interface Props {
  formik: FormikProps<UserData>;
}
export const FormationForm = ({ formik }: Props) => {
  return (
    <Stack component="form" gap={4} onSubmit={formik.handleSubmit}>
      <Stack gap={2}>
        <Button
          size="sm"
          variant="outlined"
          startDecorator={<AddRounded />}
          disabled={Boolean(formik.errors.formations)}
          onClick={() =>
            formik.setFieldValue("formations", [
              ...(formik.values.formations ?? []),
              "",
            ])
          }
        >
          Add formation
        </Button>
        <Stack>
          {formik.values.formations?.map((field, index) => (
            <Stack direction="row" key={index}>
              <Input
                size="sm"
                name={`formations[${index}].fr`}
                placeholder="Formation"
                value={field.fr}
                onChange={formik.handleChange}
                autoComplete="off"
                error={
                  formik.touched.formations && Boolean(formik.errors.formations)
                }
                sx={{
                  flex: 1,
                  borderEndEndRadius: 0,
                  borderStartEndRadius: 0,
                  borderRight: 0,
                  width: "30ch",
                }}
              />
              <Input
                size="sm"
                name={`formations[${index}].en`}
                placeholder="Formation"
                value={field.en}
                onChange={formik.handleChange}
                autoComplete="off"
                error={
                  formik.touched.formations && Boolean(formik.errors.formations)
                }
                sx={{
                  flex: 1,
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
                  formik.setFieldValue("formations", [
                    ...(formik.values.formations?.filter(
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
