import { CloudUploadOutlined } from "@mui/icons-material";
import {
  AspectRatio,
  Avatar,
  Button,
  Card,
  CardOverflow,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Stack,
  Textarea,
} from "@mui/joy";
import { FormikProps } from "formik";
import { UserData } from "../pages/TestPage";

interface Props {
  formik: FormikProps<UserData>;
}
export const ProfileForm = ({ formik }: Props) => {
  return (
    <Stack component="form" gap={4} onSubmit={formik.handleSubmit}>
      <Stack gap={3}>
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
    </Stack>
  );
};
