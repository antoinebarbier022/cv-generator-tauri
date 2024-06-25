import { Box, Stack } from "@mui/joy";
import { PropsWithChildren, ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface Props extends PropsWithChildren {
  sidebar: ReactNode;
}
export const AppLayout = ({ sidebar }: Props) => {
  const appHeight = "calc(100dvh - var(--titlebar-height))";
  return (
    <Box
      width={"100%"}
      height={appHeight}
      minHeight={appHeight}
      maxHeight={appHeight}
      sx={{
        display: "grid",
        gridTemplateColumns: "280px auto",
        paddingRight: "var(--app-border-width)",
        paddingBottom:
          "calc(var(--app-border-width) + var(--app-footer-height)) ",
      }}
    >
      <Stack
        sx={{
          userSelect: "none",
          margin: 0,
          overflow: "auto",
        }}
      >
        {sidebar}
      </Stack>
      <Stack
        overflow={"hidden"}
        sx={{
          borderRadius: "sm",
          boxShadow: "lg",
          backgroundColor: "common.white",
        }}
      >
        <Stack sx={{ margin: 0.5, paddingY: 2 }} overflow={"auto"}>
          <Outlet />
        </Stack>
      </Stack>
    </Box>
  );
};
