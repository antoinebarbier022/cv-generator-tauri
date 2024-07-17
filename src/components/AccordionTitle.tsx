import { WarningRounded } from "@mui/icons-material";
import { Stack, Tooltip, Typography } from "@mui/joy";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  content: string | ReactNode;
  placeholder?: string;
  isWarningIcon?: boolean;
}
export const AccordionTitle = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Stack direction={"row"} alignItems={"center"} gap={1}>
      {props.isWarningIcon && (
        <Tooltip
          title={t("warning.missing-translation")}
          arrow
          variant="outlined"
        >
          <WarningRounded sx={{ color: "warning.400" }} />
        </Tooltip>
      )}

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
        {props.content || (
          <span className="text-gray-400 italic">{props.placeholder}</span>
        )}
      </Typography>
    </Stack>
  );
};
