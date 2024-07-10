import { WarningRounded } from "@mui/icons-material";
import { Stack, Tooltip, Typography } from "@mui/joy";

interface Props {
  content: string;
  placeholder: string;
  index: number;
  isWarningIcon?: boolean;
}
export const AccordionTitle = (props: Props) => {
  return (
    <Stack direction={"row"} alignItems={"center"} gap={1}>
      {props.isWarningIcon && (
        <Tooltip title="Missing field" arrow variant="outlined">
          <WarningRounded sx={{ color: "danger.500" }} />
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
