import { CloudUploadOutlined } from "@mui/icons-material";
import {
  AspectRatio,
  Avatar,
  Button,
  Card,
  CardOverflow,
  Chip,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Stack,
  Textarea,
} from "@mui/joy";
import { FormikProps } from "formik";
import { UserData } from "../../../app/Views/TestPage";
import { CV_LANGUAGES } from "../../configuration/constants/languages";

interface Props {
  formik: FormikProps<UserData>;
}

export const ProfileForm = ({ formik }: Props) => {
  return (
    <Stack component="form" gap={4} onSubmit={formik.handleSubmit}>
      <Stack gap={2}>
        <div>
          <Stack sx={{ float: "inline-end", marginInlineStart: 2 }} gap={1}>
            <Card>
              <CardOverflow>
                <AspectRatio ratio={1} sx={{ width: "160px", height: "160px" }}>
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

          <Stack direction={"column"} gap={"1rem"}>
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

            <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
              <FormControl>
                <FormLabel>Grade</FormLabel>
                <Select
                  name="grade"
                  value={formik.values.grade}
                  onChange={(_, value) => formik.setFieldValue("grade", value)}
                  placeholder="A"
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
                <FormLabel>Twitter</FormLabel>
                <Input
                  name="twitter"
                  value={formik.values.twitter}
                  onChange={formik.handleChange}
                  placeholder="twitter"
                />
              </FormControl>
            </Stack>
          </Stack>
        </div>

        <FormControl>
          <FormLabel>Role</FormLabel>
          <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
            {CV_LANGUAGES.map((lang) => (
              <Input
                key={`role.${lang}`}
                name={`role.${lang}`}
                startDecorator={
                  <Chip
                    sx={{
                      marginLeft: -0.75,
                    }}
                  >
                    {lang}
                  </Chip>
                }
                value={formik.values.role[lang]}
                onChange={formik.handleChange}
                placeholder="Role FR"
              />
            ))}
          </Stack>
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
            {CV_LANGUAGES.map((lang) => (
              <Textarea
                key={`description.${lang}`}
                name={`description.${lang}`}
                startDecorator={<Chip>{lang}</Chip>}
                value={formik.values.description[lang]}
                onChange={formik.handleChange}
                placeholder="A short description of you"
                minRows={4}
              />
            ))}
          </Stack>
        </FormControl>
      </Stack>
    </Stack>
  );
};
