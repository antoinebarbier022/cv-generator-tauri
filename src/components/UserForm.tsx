import {
  AddRounded,
  CloudUploadOutlined,
  RemoveRounded,
} from "@mui/icons-material";
import {
  AspectRatio,
  Avatar,
  Button,
  Card,
  CardOverflow,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Option,
  Select,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { FormikProps } from "formik";
import { UserData, UserDataExperience } from "../pages/TestPage";

interface Props {
  formik: FormikProps<UserData>;
}
export const UserForm = ({ formik }: Props) => {
  return (
    <Stack component="form" gap={4} onSubmit={formik.handleSubmit}>
      <Stack gap={3}>
        <Stack gap={1}>
          <Typography level="h2">General</Typography>
          <Divider></Divider>
        </Stack>

        <Stack direction={"row-reverse"} gap={4}>
          <Stack gap={1}>
            <Card>
              <CardOverflow>
                <AspectRatio ratio={1} sx={{ width: "180px", height: "180px" }}>
                  <Avatar />
                </AspectRatio>
              </CardOverflow>
            </Card>
            <Button
              size="sm"
              startDecorator={<CloudUploadOutlined />}
              sx={{ fontWeight: "500" }}
            >
              Upload image
            </Button>
          </Stack>
          <Stack direction={"column"} gap={2} flex={1}>
            <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Lastname</FormLabel>
                <Input
                  id="lastname"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  placeholder="Lastname"
                />
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Firstname</FormLabel>
                <Input
                  id="firstname"
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  placeholder="Firstname"
                />
              </FormControl>
            </Stack>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                placeholder="Role"
              />
            </FormControl>
            <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
              <FormControl>
                <FormLabel>Grade</FormLabel>
                <Select
                  name="grade"
                  value={formik.values.grade}
                  onChange={(_, value) => formik.setFieldValue("grade", value)}
                  placeholder="Grade"
                  sx={{ width: "7ch" }}
                >
                  {["A", "B", "C", "D", "E", "F"].map((value) => (
                    <Option value={value} key={`grade-${value}`}>
                      {value}
                    </Option>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Entity</FormLabel>
                <Input
                  name="entity"
                  value={formik.values.entity}
                  onChange={formik.handleChange}
                  placeholder="Entity"
                />
              </FormControl>
            </Stack>
          </Stack>
        </Stack>

        <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel>Linkedin</FormLabel>
            <Input
              name="linkedin"
              value={formik.values.linkedin}
              onChange={formik.handleChange}
              placeholder="linkedin"
            />
          </FormControl>

          <FormControl sx={{ flex: 1 }}>
            <FormLabel>Github</FormLabel>
            <Input
              name="github"
              value={formik.values.github}
              onChange={formik.handleChange}
              placeholder="github"
            />
          </FormControl>

          <FormControl sx={{ flex: 1 }}>
            <FormLabel>Twitter</FormLabel>
            <Input
              name="twitter"
              value={formik.values.twitter}
              onChange={formik.handleChange}
              placeholder="twitter"
            />
          </FormControl>
        </Stack>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="A short description of you"
            minRows={4}
          />
        </FormControl>
      </Stack>

      <Stack gap={2}>
        <Stack gap={1}>
          <Typography level="h2">Skills</Typography>
          <Divider></Divider>
        </Stack>

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
                name={`skills[${index}]`}
                placeholder="Skill"
                value={field}
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

      <Stack gap={2}>
        <Stack gap={1}>
          <Typography level="h2">Formation</Typography>
          <Divider></Divider>
        </Stack>

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
                name={`formations[${index}]`}
                placeholder="Formation"
                value={field}
                onChange={formik.handleChange}
                autoComplete="off"
                error={
                  formik.touched.formations && Boolean(formik.errors.formations)
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

      <Stack gap={2}>
        <Stack gap={1}>
          <Typography level="h2">Experiences</Typography>
          <Divider></Divider>
        </Stack>

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
            Add Experience
          </Button>
        </Stack>
      </Stack>

      <Button type="submit">Submit</Button>
    </Stack>
  );
};
