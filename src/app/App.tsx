import { Stack } from "@mui/joy";
import { AppProvider } from "./AppProvider";
import { AppRouter } from "./AppRouter";

const App = () => {
  return (
    <AppProvider>
      <Stack
        data-tauri-drag-region
        sx={{
          height: "var(--titlebar-height)",
          userSelect: "none",
        }}
      />
      <AppRouter />
    </AppProvider>
  );
};

export default App;
