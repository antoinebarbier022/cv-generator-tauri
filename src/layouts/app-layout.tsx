import { Box, Stack } from "@mui/joy";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "../components/ScrollToTop";

interface Props {
  sidebar: ReactNode;
}
export const AppLayout = ({ sidebar }: Props) => {
  const appHeight = "calc(100dvh - var(--titlebar-height))";

  return (
    <>
      <ScrollToTop selector="#scroll-container" />
      <Box
        width={"100%"}
        height={appHeight}
        minHeight={appHeight}
        maxHeight={appHeight}
        sx={{
          display: "grid",
          gridTemplateColumns: "260px auto",
          paddingRight: "var(--app-border-width)",
          paddingBottom:
            "calc(var(--app-border-width) + var(--app-footer-height)) ",
        }}
      >
        <Stack
          sx={{
            userSelect: "none",
            margin: 0,
            scrollbarGutter: "stable",
            overscrollBehavior: "none",
            overflow: "hidden",
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
          <Stack
            id="scroll-container"
            sx={{
              paddingY: 2,
              scrollbarGutter: "stable",
              overflowY: "scroll",
              flex: 1,
            }}
          >
            <Outlet />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
