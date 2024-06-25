import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SidebarContainer } from "../containers/SidebarContainer";
import { TestPage } from "../pages/TestPage";
import { AppLayout } from "./AppLayout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout sidebar={<SidebarContainer />} />}>
          <Route index element={<TestPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
