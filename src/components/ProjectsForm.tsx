import { AddRounded } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@mui/joy";
import { FormikProps } from "formik";
import { UserData, UserDataExperience } from "../pages/TestPage";

interface Props {
  formik: FormikProps<UserData>;
}
export const ProjectsForm = ({ formik }: Props) => {
  return (
    <Stack component="form" gap={4} onSubmit={formik.handleSubmit}>
      <Stack gap={2}>
        <Stack gap={1}>
          {formik.values.experiences?.map((field, index) => (
            <Stack component={"fieldset"} gap={1} key={index}>
              <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
                <FormControl>
                  <FormLabel>Program</FormLabel>
                  <Input
                    size="sm"
                    name={`experiences[${index}].program`}
                    placeholder="Program"
                    value={field.program}
                    onChange={formik.handleChange}
                    autoComplete="off"
                    error={
                      formik.touched.experiences &&
                      Boolean(formik.errors.experiences)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Client</FormLabel>
                  <Input
                    size="sm"
                    name={`experiences[${index}].client`}
                    placeholder="Client"
                    value={field.client}
                    onChange={formik.handleChange}
                    autoComplete="off"
                    error={
                      formik.touched.experiences &&
                      Boolean(formik.errors.experiences)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input
                    size="sm"
                    name={`experiences[${index}].date`}
                    placeholder="Date"
                    value={field.date}
                    onChange={formik.handleChange}
                    autoComplete="off"
                    error={
                      formik.touched.experiences &&
                      Boolean(formik.errors.experiences)
                    }
                  />
                </FormControl>
              </Stack>

              <FormControl>
                <FormLabel>Context</FormLabel>
                <Textarea
                  size="sm"
                  name={`experiences[${index}].context`}
                  placeholder="Context"
                  value={field.context}
                  onChange={formik.handleChange}
                  autoComplete="off"
                  minRows={2}
                  error={
                    formik.touched.experiences &&
                    Boolean(formik.errors.experiences)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Contribution</FormLabel>
                <Textarea
                  size="sm"
                  name={`experiences[${index}].contribution`}
                  placeholder="Contribution"
                  value={field.contribution}
                  onChange={formik.handleChange}
                  autoComplete="off"
                  minRows={3}
                  error={
                    formik.touched.experiences &&
                    Boolean(formik.errors.experiences)
                  }
                />
              </FormControl>

              <Button
                color="primary"
                size="sm"
                variant="solid"
                onClick={() =>
                  formik.setFieldValue("experiences", [
                    ...(formik.values.experiences?.filter(
                      (_, i) => i !== index
                    ) ?? []),
                  ])
                }
                sx={{ width: "fit-content" }}
              >
                Delete
              </Button>
            </Stack>
          ))}
          <Button
            size="sm"
            variant="outlined"
            startDecorator={<AddRounded />}
            disabled={Boolean(formik.errors.experiences)}
            onClick={() =>
              formik.setFieldValue("experiences", [
                ...(formik.values.experiences ?? []),
                {
                  client: "",
                  program: "",
                  role: "",
                  date: "",
                  context: "",
                  contribution: "",
                } as UserDataExperience,
              ])
            }
          >
            Add Project
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
