import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Formation } from "./Views/Formation";

import { Alert } from "@mui/joy";
import { MenuModalDebug } from "../features/menu/containers/menu-modal-debug/menu-modal-debug";

import { useMenuEvents } from "../features/menu/hooks/useMenuEvents";
import { SidebarContainer } from "../features/sidebar/containers/SidebarContainer";
import { AppLayout } from "../layouts/app-layout";
import { EmploymentHistory } from "./Views/EmploymentHistory";
import { Languages } from "./Views/Languages";
import { MyAccount } from "./Views/MyAccount";
import { Profile } from "./Views/Profile";
import { Projects } from "./Views/Projects";
import { Sectors } from "./Views/Sectors";
import { Skills } from "./Views/Skills";
import { Test2View } from "./Views/Test2View";
import { TestView } from "./Views/TestView";

export const AppRouter = () => {
  const navigate = useNavigate();
  const { isLoadingGenerate } = useMenuEvents();

  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Routes location={background || location}>
        <Route
          path="/"
          element={
            <AppLayout
              sidebar={
                <SidebarContainer isLoadingGenerate={isLoadingGenerate} />
              }
            />
          }
        >
          <Route path="my-account" element={<MyAccount />} />
          <Route index element={<Navigate to={"/profile"} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="skills" element={<Skills />} />
          <Route path="sectors" element={<Sectors />} />
          <Route path="languages" element={<Languages />} />
          <Route path="projects" element={<Projects />} />
          <Route path="formation" element={<Formation />} />
          <Route path="tests">
            <Route index element={<TestView />} />
            <Route path="1" element={<TestView />} />
            <Route path="2" element={<Test2View />} />
          </Route>

          <Route path="employment-history" element={<EmploymentHistory />} />
          <Route path="*" element={<Alert>Error 404.</Alert>} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="debug"
            element={<MenuModalDebug open onClose={() => navigate(-1)} />}
          />
        </Routes>
      )}
    </>
  );
};
