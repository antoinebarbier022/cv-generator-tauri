import ReactDOM from "react-dom/client";

import App from "./app";
import { TitleBar } from "./features/titlebar/components/TitleBar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <TitleBar />
    <App />
  </>
);
