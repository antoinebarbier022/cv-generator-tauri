import { CloseRounded } from "@mui/icons-material";
import { IconButton, Link, Stack, Typography } from "@mui/joy";
import { MouseEventHandler } from "react";

interface Props {
  filename: string;
  onOpenFinder: MouseEventHandler<HTMLAnchorElement> | undefined;
  onClose?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

export const ToastGenerationSuccess = ({
  filename,
  onOpenFinder,
  onClose,
}: Props) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack>
        <Typography textColor={"text.primary"}>{filename}</Typography>
        <Stack direction={"column-reverse"}>
          <Link
            className="peer"
            mt={1}
            sx={{ width: "fit-content" }}
            fontSize={"0.75rem"}
            onClick={onOpenFinder}
          >
            Afficher dans le finder
          </Link>
          <Typography
            className="group-hover:hidden peer-hover:flex group-has-[.close:hover]:flex"
            sx={{ width: "fit-content" }}
            fontSize={"0.75rem"}
          >
            PPTX
          </Typography>

          <Typography
            sx={{ width: "fit-content", display: "none" }}
            className="group-hover:flex peer-hover:hidden group-has-[.close:hover]:hidden"
            fontSize={"0.75rem"}
          >
            Ouvrir dans Microsoft PowerPoint
          </Typography>
        </Stack>
      </Stack>
      <IconButton size="sm" className="close" onClick={onClose}>
        <CloseRounded />
      </IconButton>
    </Stack>
  );
};
