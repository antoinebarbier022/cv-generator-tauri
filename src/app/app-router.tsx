import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { EmploymentHistoryPage } from '@/app/routes/cv-forms/employment-history-page'
import { LanguagesPage } from '@/app/routes/cv-forms/languages-page'
import { SkillsPage } from '@/app/routes/cv-forms/skills-page'
import { FooterBarContainer } from '@/common/footer/containers/footer-bar-container'
import { SidebarContainer } from '@/common/sidebar/containers/sidebar-container'

import { ProfilePage } from '@/app/routes/cv-forms/profile-page'

import { ThemesSettings } from '@/features/themes/containers/themes-settings'
import { TranslatorSettings } from '@/features/translators/containers/translator-settings'
import { useMenuEvents } from '@/hooks/useMenuEvents'
import { useRedirectToWelcomePage } from '@/hooks/useRedirectToWelcomePage'
import { AppLayout } from '@/layouts/app-layout'
import { WelcomeLayout } from '@/layouts/welcome-layout'
import { Alert } from '@mui/joy'
import { FormationPage } from './routes/cv-forms/formation-page'
import { ProjectsPage } from './routes/cv-forms/projects-page'
import { SectorsPage } from './routes/cv-forms/sectors-page'
import { DebugModal } from './routes/debug/debug-modal'
import { SettingsModal } from './routes/settings/settings-modal'
import { SummaryPage } from './routes/summary-page'
import { WelcomePage } from './routes/welcome-page'

export const AppRouter = () => {
  const { isLoadingGenerate } = useMenuEvents()

  const navigate = useNavigate()
  const location = useLocation()

  useRedirectToWelcomePage()

  const background = location.state && location.state.background
  return (
    <>
      <Routes location={background || location}>
        <Route path="/welcome" element={<WelcomeLayout />}>
          <Route index element={<WelcomePage />} />
        </Route>
        <Route
          path="/"
          element={
            <AppLayout
              sidebar={<SidebarContainer isLoadingGenerate={isLoadingGenerate} />}
              footerBar={<FooterBarContainer />}
            />
          }
        >
          <Route index element={<Navigate to={'/profile'} />} />
          <Route path="my-account" element={<SummaryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="sectors" element={<SectorsPage />} />
          <Route path="languages" element={<LanguagesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="formation" element={<FormationPage />} />
          <Route path="employment_history" element={<EmploymentHistoryPage />} />
          <Route path="*" element={<Alert>Error 404.</Alert>} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="debug" element={<DebugModal open onClose={() => navigate(-1)} />} />
          <Route
            path="/settings"
            element={<SettingsModal open onClose={() => navigate(background)} />}
          >
            <Route
              index
              element={
                <Navigate
                  to={'general'}
                  state={{
                    background
                  }}
                />
              }
            />
            <Route path="general" element={<TranslatorSettings />} />
            <Route path="themes" element={<ThemesSettings />} />
          </Route>
        </Routes>
      )}
    </>
  )
}
