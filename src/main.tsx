import React from "react";
import ReactDOM from "react-dom/client";

import { CssBaseline, CssVarsProvider } from "@mui/joy";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="light">
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);
