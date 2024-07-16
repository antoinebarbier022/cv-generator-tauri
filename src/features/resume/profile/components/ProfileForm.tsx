import { CloudUploadOutlined } from "@mui/icons-material";
import {
  AspectRatio,
  Avatar,
  Button,
  Card,
  CardOverflow,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link,
  Option,
  Select,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { CV_LANGUAGES } from "../../../../constants/languages";
import { UserData } from "../../../storage/types/storage";

interface Props {
  formik: FormikProps<UserData>;
  onUploadPicture: () => void;
  onDeletePicture: () => void;
}

export const ProfileForm = ({
  formik,
  onUploadPicture,
  onDeletePicture,
}: Props) => {
  const { t } = useTranslation();
  const gradeOptions = ["A", "B", "C", "D", "E", "F"];

  const entityOptions = new Map<string, string>([
    ["BR", "Business Reinvention"],
    ["CXT", "CX Transformation"],
    ["CDT", "Customer Data & Tech"],
    ["CD", "Creative & Design"],
  ]);
  return (
    <Stack component="form" gap={4} onSubmit={formik.handleSubmit}>
      <Stack>
        <Stack direction={"row"} gap={2}>
          <Stack direction={"column"} gap={"1rem"} flex={1}>
            <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>{t("input.firstname.label")}</FormLabel>
                <Input
                  id="firstname"
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  placeholder={t("input.firstname.placeholder")}
                />
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <FormLabel>{t("input.lastname.label")}</FormLabel>
                <Input
                  id="lastname"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  placeholder={t("input.lastname.placeholder")}
                />
              </FormControl>
            </Stack>

            <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
              <FormControl>
                <FormLabel>{t("input.grade.label")}</FormLabel>
                <Select
                  name="grade"
                  value={
                    Boolean(formik.values.grade) ? formik.values.grade : null
                  }
                  onChange={(_, value) => formik.setFieldValue("grade", value)}
                  placeholder={t("input.grade.placeholder")}
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
                <FormLabel>{t("input.entity.label")}</FormLabel>

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
                  placeholder={t("input.entity.placeholder")}
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
                <FormLabel>{t("input.linkedin.label")}</FormLabel>
                <Input
                  name="linkedin"
                  value={formik.values.linkedin}
                  onChange={formik.handleChange}
                  placeholder={t("input.linkedin.placeholder")}
                />
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <FormLabel>{t("input.twitter.label")}</FormLabel>
                <Input
                  name="twitter"
                  value={formik.values.twitter}
                  onChange={formik.handleChange}
                  placeholder={t("input.twitter.placeholder")}
                />
              </FormControl>
            </Stack>
          </Stack>
          <Stack gap={1}>
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
            <Stack gap={1}>
              <Button
                size="sm"
                startDecorator={<CloudUploadOutlined />}
                sx={{ fontWeight: "500" }}
                onClick={onUploadPicture}
              >
                {formik.values.picture
                  ? t("button.replace-profile-image.label")
                  : t("button.upload-profile-image.label")}
              </Button>
              <Typography
                level="body-xs"
                visibility={
                  Boolean(formik.values.picture) ? "visible" : "hidden"
                }
                component={Link}
                onClick={onDeletePicture}
                textAlign={"center"}
              >
                {t("button.delete-profile-image.label")}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ marginY: "1rem" }} />
        <Stack gap={2}>
          <Stack>
            <FormLabel>{t("input.role.label")}</FormLabel>
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
                  placeholder={`${t(
                    "input.role.placeholder"
                  )} ${lang.toUpperCase()}`}
                />
              ))}
            </Stack>
          </Stack>

          <Stack>
            <FormLabel>{t("input.description.label")}</FormLabel>
            <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
              {CV_LANGUAGES.map((lang) => (
                <Textarea
                  key={`description.${lang}`}
                  name={`description.${lang}`}
                  startDecorator={<Chip>{lang}</Chip>}
                  value={formik.values.description[lang]}
                  onChange={formik.handleChange}
                  placeholder={t("input.description.placeholder")}
                  minRows={4}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
