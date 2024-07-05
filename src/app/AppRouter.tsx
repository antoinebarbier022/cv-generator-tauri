import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CvConfigurationContainer } from "../features/configuration/containers/CvConfigurationContainer";
import { EmploymentHistoryContainer } from "../features/form/containers/EmploymentHistoryContainer";
import { FormationContainer } from "../features/form/containers/FormationContainer";
import { ProfileContainer } from "../features/form/containers/ProfileContainer";
import { ProjectsContainer } from "../features/form/containers/ProjectsContainer";
import { SkillsContainer } from "../features/form/containers/SkillsContainer";
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
          <Route path="projects" element={<ProjectsContainer />} />
          <Route path="formation" element={<FormationContainer />} />
          <Route
            path="cv-configuration"
            element={<CvConfigurationContainer />}
          />
          <Route
            path="employment-history"
            element={<EmploymentHistoryContainer />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
