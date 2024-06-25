import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "../styles/index.css";
import theme from "../themes/default-theme.ts";

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <CssVarsProvider
      theme={theme}
      defaultMode="light"
      modeStorageKey="joy-mode-scheme-light"
    >
      <CssBaseline />

      {children}
      <ToastContainer limit={2} />
    </CssVarsProvider>
  );
};
