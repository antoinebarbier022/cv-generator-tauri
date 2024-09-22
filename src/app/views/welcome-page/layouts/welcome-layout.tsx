import { Box, Container, Sheet, Stack } from "@mui/joy";
import { Outlet } from "react-router-dom";

export const WelcomeLayout = () => {
  const appHeight = "calc(100dvh - var(--titlebar-height))";

  return (
    <>
      <Box
        width={"100%"}
        height={appHeight}
        minHeight={appHeight}
        maxHeight={appHeight}
        sx={{
          display: "grid",
          gridTemplateColumns: "auto",
        }}
      >
        <Stack
          overflow={"hidden"}
          sx={{
            borderRadius: "sm",
            boxShadow: "lg",
          }}
        >
          <Stack
            data-tauri-drag-region
            component={Sheet}
            variant="solid"
            height={"100%"}
            sx={{ bgcolor: "transparent", userSelect: "none" }}
            justifyContent={"center"}
            invertedColors
          >
            <Stack component={Container} maxWidth="sm" gap={4}>
              <Outlet />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
