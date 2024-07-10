import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { FormationContainer } from "../features/resume/formations/containers/FormationContainer";

import { EmploymentHistoryContainer } from "../features/resume/employment-history/containers/EmploymentHistoryContainer";
import { LanguagesContainer } from "../features/resume/languages/containers/LanguagesContainer";
import { ProfileContainer } from "../features/resume/profile/containers/ProfileContainer";
import { ProjectsContainer } from "../features/resume/projects/containers/ProjectsContainer";
import { SkillsContainer } from "../features/resume/skills/containers/SkillsContainer";
import { SidebarContainer } from "../features/sidebar/containers/SidebarContainer";
import { AppLayout } from "../layouts/AppLayout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout sidebar={<SidebarContainer />} />}>
          <Route index element={<Navigate to={"/profile"} />} />
          <Route path="profile" element={<ProfileContainer />} />
          <Route path="skills" element={<SkillsContainer />} />
          <Route path="languages" element={<LanguagesContainer />} />
          <Route path="projects" element={<ProjectsContainer />} />
          <Route path="formation" element={<FormationContainer />} />

          <Route
            path="employment-history"
            element={<EmploymentHistoryContainer />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
