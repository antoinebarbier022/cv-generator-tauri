import { Stack } from "@mui/joy";

export const TitleBar = () => {
  return (
    <Stack
      data-tauri-drag-region
      sx={{
        height: "var(--titlebar-height)",
        userSelect: "none",
      }}
    />
  );
};
