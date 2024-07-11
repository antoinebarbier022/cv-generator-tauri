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
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { FormikProps } from "formik";
import { CV_LANGUAGES } from "../../../../constants/languages";
import { UserData } from "../../../storage/types/storage";

interface Props {
  formik: FormikProps<UserData>;
  onClickUploadPicture: () => void;
}

export const ProfileForm = ({ formik, onClickUploadPicture }: Props) => {
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
                    src={`${convertFileSrc(
                      formik.values.picture
                    )}?removeCache=${new Date()}`}
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
                  value={
                    Boolean(formik.values.grade) ? formik.values.grade : null
                  }
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
                  value={
                    Boolean(formik.values.entity) ? formik.values.entity : null
                  }
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
                    <Option value={key} label={value} key={`entity-${key}`}>
                      {value}
                      <span className="w-[5ch] text-neutral-500">[{key}]</span>
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

        <Stack>
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
        </Stack>

        <Stack>
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
        </Stack>
      </Stack>
    </Stack>
  );
};
