import { Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";

interface Props {
  program: string;
  client: string;
  role: string;
  date: string;
}
export const ProjectTitle = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Typography
      level="title-md"
      fontWeight={"400"}
      sx={{
        display: "-webkit-box",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {props.program || (
        <span className="text-gray-400 italic">
          {t("input.project.program.label")}
        </span>
      )}{" "}
      -{" "}
      {props.client || (
        <span className="text-gray-400 italic">
          {t("input.project.client.label")}
        </span>
      )}{" "}
      -{" "}
      {props.role || (
        <span className="text-gray-400 italic">
          {t("input.project.role.label")}
        </span>
      )}{" "}
      -{" "}
      {props.date || (
        <span className="text-gray-400 italic">
          {t("input.project.date.label")}
        </span>
      )}
    </Typography>
  );
};
