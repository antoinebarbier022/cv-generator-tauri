import "@/configs/i18n.config";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "../styles/index.css";
import theme from "../themes/default-theme.ts";

export const AppProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {},
    },
  });
  return (
    <CssVarsProvider
      theme={theme}
      defaultMode="light"
      modeStorageKey="joy-mode-scheme-light"
    >
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      </QueryClientProvider>

      <ToastContainer limit={2} />
    </CssVarsProvider>
  );
};
