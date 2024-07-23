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
import { MenuModalExport } from "../features/menu/containers/menu-modal-export/menu-modal-export";
import { MenuModalGenerate } from "../features/menu/containers/menu-modal-generate/menu-modal-generate";
import { MenuModalImport } from "../features/menu/containers/menu-modal-import/menu-modal-import";
import { useMenuEvents } from "../features/menu/hooks/useMenuEvents";
import { ProjectsContainer } from "../features/projects/containers/ProjectsContainer";
import { SidebarContainer } from "../features/sidebar/containers/SidebarContainer";
import { AppLayout } from "../layouts/AppLayout";
import { EmploymentHistory } from "./Views/EmploymentHistory";
import { Languages } from "./Views/Languages";
import { Profile } from "./Views/Profile";
import { Skills } from "./Views/Skills";

export const AppRouter = () => {
  const navigate = useNavigate();
  useMenuEvents();

  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<AppLayout sidebar={<SidebarContainer />} />}>
          <Route index element={<Navigate to={"/profile"} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="skills" element={<Skills />} />
          <Route path="languages" element={<Languages />} />
          <Route path="projects" element={<ProjectsContainer />} />
          <Route path="formation" element={<Formation />} />

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
          <Route
            path="export"
            element={<MenuModalExport open onClose={() => navigate(-1)} />}
          />
          <Route
            path="import"
            element={<MenuModalImport open onClose={() => navigate(-1)} />}
          />
          <Route
            path="generate"
            element={<MenuModalGenerate open onClose={() => navigate(-1)} />}
          />
        </Routes>
      )}
    </>
  );
};
