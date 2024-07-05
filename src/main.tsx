import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app";
import TitleBar from "./features/titlebar/components/titlebar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TitleBar />
    <App />
  </React.StrictMode>
);
