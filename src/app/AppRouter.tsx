import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { FormationContainer } from "../features/resume/formations/containers/FormationContainer";

import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { DebugModal } from "../features/debug/components/DebugModal";
import { EmploymentHistoryContainer } from "../features/resume/employment-history/containers/EmploymentHistoryContainer";
import { LanguagesContainer } from "../features/resume/languages/containers/LanguagesContainer";
import { ProfileContainer } from "../features/resume/profile/containers/ProfileContainer";
import { ProjectsContainer } from "../features/resume/projects/containers/ProjectsContainer";
import { SkillsContainer } from "../features/resume/skills/containers/SkillsContainer";
import { SidebarContainer } from "../features/sidebar/containers/SidebarContainer";
import { AppLayout } from "../layouts/AppLayout";

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
        <Route path="profile" element={<ProfileContainer />} />
        <Route path="skills" element={<SkillsContainer />} />
        <Route path="languages" element={<LanguagesContainer />} />
        <Route path="projects" element={<ProjectsContainer />} />
        <Route path="formation" element={<FormationContainer />} />
        <Route
          path="debug"
          element={<DebugModal open={true} onClose={() => navigate(-1)} />}
        />
        <Route
          path="employment-history"
          element={<EmploymentHistoryContainer />}
        />
      </Route>
    </Routes>
  );
};
