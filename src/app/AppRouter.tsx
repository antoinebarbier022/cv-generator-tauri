import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { FooterBarContainer } from '@/containers/footer-bar-container'
import { SidebarContainer } from '@/containers/sidebar-container'
import { EmploymentHistorySection } from '@/features/cv-resume/employment-history/employment-history-section'
import { FormationSection } from '@/features/cv-resume/formation/formation-section'
import { LanguagesSection } from '@/features/cv-resume/languages/languages-section'
import { ProfileSection } from '@/features/cv-resume/profile/profile-section'
import { ProjectsSection } from '@/features/cv-resume/projects/containers/projects-section'
import { SectorsSection } from '@/features/cv-resume/sectors/sectors-section'
import { SkillsSection } from '@/features/cv-resume/skills/skills-section'
import { useMenuEvents } from '@/hooks/useMenuEvents'
import { useRedirectToWelcomePage } from '@/hooks/useRedirectToWelcomePage'
import { AppLayout } from '@/layouts/app-layout'
import { WelcomeLayout } from '@/layouts/welcome-layout'
import { Alert } from '@mui/joy'
import { DebugModal } from './Routes/debug/debug-modal'
import { SummaryPage } from './Routes/summary-page'
import { WelcomePage } from './Routes/welcome-page'

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
          <Route path="profile" element={<ProfileSection />} />
          <Route path="skills" element={<SkillsSection />} />
          <Route path="sectors" element={<SectorsSection />} />
          <Route path="languages" element={<LanguagesSection />} />
          <Route path="projects" element={<ProjectsSection />} />
          <Route path="formation" element={<FormationSection />} />
          <Route path="employment_history" element={<EmploymentHistorySection />} />
          <Route path="*" element={<Alert>Error 404.</Alert>} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="debug" element={<DebugModal open onClose={() => navigate(-1)} />} />
        </Routes>
      )}
    </>
  )
}
