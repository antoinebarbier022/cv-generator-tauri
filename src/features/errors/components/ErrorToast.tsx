import { Sheet, Stack, Typography } from "@mui/joy";
import { ErrorContent } from "@generated/features/errors/types/errors";

export const ErrorToast = ({error: {title, message}}: { error: ErrorContent }) => <Stack component={Sheet} invertedColors variant="solid" color="danger" sx={{background: "none"}}>
  <Typography level="title-lg">{title}</Typography>
  <Typography level="body-sm" color="danger">{message}</Typography>
</Stack>