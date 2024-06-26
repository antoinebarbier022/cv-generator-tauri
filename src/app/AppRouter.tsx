import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CvConfigurationContainer } from "../containers/CvConfigurationContainer";
import { EmploymentHistoryContainer } from "../containers/EmploymentHistoryContainer";
import { FormationContainer } from "../containers/FormationContainer";
import { ProfileContainer } from "../containers/ProfileContainer";
import { ProjectsContainer } from "../containers/ProjectsContainer";
import { SidebarContainer } from "../containers/SidebarContainer";
import { SkillsContainer } from "../containers/SkillsContainer";
import { AppLayout } from "../layouts/AppLayout";
import { TestPage } from "../pages/TestPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout sidebar={<SidebarContainer />} />}>
          <Route index element={<TestPage />}></Route>
          <Route path="profile" element={<ProfileContainer />}></Route>
          <Route path="skills" element={<SkillsContainer />}></Route>
          <Route path="projects" element={<ProjectsContainer />}></Route>
          <Route path="formation" element={<FormationContainer />}></Route>
          <Route
            path="cv-configuration"
            element={<CvConfigurationContainer />}
          ></Route>
          <Route
            path="employment-history"
            element={<EmploymentHistoryContainer />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
