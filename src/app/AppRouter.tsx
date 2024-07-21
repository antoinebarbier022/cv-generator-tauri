import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { Formation } from "./Views/Formation";

import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { DebugModal } from "../features/debug/components/DebugModal";
import { ProjectsContainer } from "../features/projects/containers/ProjectsContainer";
import { SidebarContainer } from "../features/sidebar/containers/SidebarContainer";
import { AppLayout } from "../layouts/AppLayout";
import { EmploymentHistory } from "./Views/EmploymentHistory";
import { Languages } from "./Views/Languages";
import { Profile } from "./Views/Profile";
import { Skills } from "./Views/Skills";

export const AppRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unlisten = listen("navigate-to-debug-panel", () => {
      if (location.pathname !== "/debug") {
        navigate("/debug");
      }
    });

    return () => {
      unlisten.then((dispose) => dispose());
    };
  }, [history]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout sidebar={<SidebarContainer />} />}>
        <Route index element={<Navigate to={"/profile"} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="skills" element={<Skills />} />
        <Route path="languages" element={<Languages />} />
        <Route path="projects" element={<ProjectsContainer />} />
        <Route path="formation" element={<Formation />} />
        <Route
          path="debug"
          element={<DebugModal open={true} onClose={() => navigate(-1)} />}
        />
        <Route path="employment-history" element={<EmploymentHistory />} />
      </Route>
    </Routes>
  );
};
