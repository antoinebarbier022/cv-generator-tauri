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
import { CV_LANGUAGES } from "../../../configuration/constants/languages";
import { UserData } from "../../../storage/types/storage";

interface Props {
  formik: FormikProps<UserData>;
  image: string | undefined;
  onClickUploadPicture: () => void;
}

export const ProfileForm = ({ image, formik, onClickUploadPicture }: Props) => {
  const gradeOptions = ["A", "B", "C", "D", "E", "F"];

  const entityOptions = new Map<string, string>([
    ["BR", "Business Reinvention"],
    ["CXT", "CX Transformation"],
    ["CDT", "Customer Data & Tech"],
    ["CD", "Creative & Design"],
  ]);
  return (
    <Stack component="form" gap={4} onSubmit={formik.handleSubmit}>
      <Stack gap={2}>
        <div>
          <Stack sx={{ float: "inline-end", marginInlineStart: 2 }} gap={1}>
            <Card>
              <CardOverflow>
                <AspectRatio ratio={1} sx={{ width: "160px", height: "160px" }}>
                  <Avatar
                    sx={{ borderRadius: 0 }}
                    src={`${image}?removeCache=${new Date()}`}
                  />
                </AspectRatio>
              </CardOverflow>
            </Card>
            <Button
              size="sm"
              startDecorator={<CloudUploadOutlined />}
              sx={{ fontWeight: "500" }}
              onClick={onClickUploadPicture}
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
                  {gradeOptions.map((value) => (
                    <Option value={value} key={`grade-${value}`}>
                      {value}
                    </Option>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Entity</FormLabel>

                <Select
                  name="entity"
                  value={formik.values.entity}
                  onChange={(_, value) => {
                    formik.setFieldValue("entity", value);
                    formik.setFieldValue(
                      "team",
                      (value && entityOptions.get(value)) ?? ""
                    );
                  }}
                  placeholder="Entity"
                >
                  {Array.from(entityOptions).map(([key, value]) => (
                    <Option value={key} key={`entity-${key}`}>
                      {value}
                    </Option>
                  ))}
                </Select>
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
