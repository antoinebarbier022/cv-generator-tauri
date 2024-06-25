import { Stack } from "@mui/joy";

export default function TitleBar() {
  return (
    <Stack
      data-tauri-drag-region
      sx={{
        height: "var(--titlebar-height)",
        userSelect: "none",
      }}
    />
  );
}
