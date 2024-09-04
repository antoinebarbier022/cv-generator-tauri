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

import { useEffect } from "react";
import { FooterBar } from "../features/footer-bar/containers/FooterBar";
import { StorageService } from "../features/storage/services/StorageService";
import { AppLayout } from "../layouts/app-layout";
import { WelcomeLayout } from "../layouts/welcome-layout";
import { EmploymentHistory } from "./Views/EmploymentHistory";
import { Languages } from "./Views/Languages";
import { MyAccount } from "./Views/MyAccount";
import { Profile } from "./Views/Profile";
import { Projects } from "./Views/Projects";
import { Sectors } from "./Views/Sectors";
import { Skills } from "./Views/Skills";
import { WelcomeView } from "./Views/WelcomeView";

export const AppRouter = () => {
  const navigate = useNavigate();
  const { isLoadingGenerate } = useMenuEvents();

  useEffect(() => {
    const fetchData = async () => {
      const result = await StorageService.getContentData(); // Supposons que `data` soit une promesse ou que tu attendes un appel asynchrone pour obtenir `data`

      console.log(result?.firstname === "" && result?.lastname === "");
      if (result?.firstname === "" && result?.lastname === "") {
        navigate("/welcome");
      }
    };

    fetchData();
  }, []);

  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Routes location={background || location}>
        <Route path="/welcome" element={<WelcomeLayout />}>
          <Route index element={<WelcomeView />} />
        </Route>
        <Route
          path="/"
          element={
            <AppLayout
              sidebar={
                <SidebarContainer isLoadingGenerate={isLoadingGenerate} />
              }
              footerBar={<FooterBar />}
            />
          }
        >
          <Route index element={<Navigate to={"/profile"} />} />
          <Route path="my-account" element={<MyAccount />} />
          <Route path="profile" element={<Profile />} />
          <Route path="skills" element={<Skills />} />
          <Route path="sectors" element={<Sectors />} />
          <Route path="languages" element={<Languages />} />
          <Route path="projects" element={<Projects />} />
          <Route path="formation" element={<Formation />} />
          <Route path="employment_history" element={<EmploymentHistory />} />
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
