import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { Button, IconButton, Input, Stack } from "@mui/joy";
import { FormikProps } from "formik";
import { UserData } from "../../pages/TestPage";

interface Props {
  formik: FormikProps<UserData>;
}
export const SkillsForm = ({ formik }: Props) => {
  return (
    <Stack component="form" gap={4} onSubmit={formik.handleSubmit}>
      <Stack gap={2}>
        <Button
          size="sm"
          variant="outlined"
          startDecorator={<AddRounded />}
          disabled={Boolean(formik.errors.skills)}
          onClick={() =>
            formik.setFieldValue("skills", [
              ...(formik.values.skills ?? []),
              "",
            ])
          }
        >
          Add Skill
        </Button>
        <Stack gap={2}>
          {formik.values.skills?.map((field, index) => (
            <Stack direction="row" key={index}>
              <Input
                size="sm"
                name={`skills[${index}].fr`}
                placeholder="Skill"
                value={field.fr}
                onChange={formik.handleChange}
                autoComplete="off"
                error={formik.touched.skills && Boolean(formik.errors.skills)}
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
                  formik.setFieldValue("skills", [
                    ...(formik.values.skills?.filter((_, i) => i !== index) ??
                      []),
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
