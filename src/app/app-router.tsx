import { Navigate, Route, Routes } from 'react-router-dom'

import { EmploymentHistoryPage } from '@/app/routes/cv-forms/employment-history-page'
import { LanguagesPage } from '@/app/routes/cv-forms/languages-page'
import { SkillsPage } from '@/app/routes/cv-forms/skills-page'
import { FooterBarContainer } from '@/common/footer/containers/footer-bar-container'
import { SidebarContainer } from '@/common/sidebar/containers/sidebar-container'

import { ProfilePage } from '@/app/routes/cv-forms/profile-page'

import { UpdaterContainer } from '@/common/updater/containers/updater-container'
import { useMenuEvents } from '@/hooks/useMenuEvents'
import { useNavigateToModal } from '@/hooks/useNavigateToModal'
import { useNavigationLogger } from '@/hooks/useNavigationLogger'
import { useRedirectToWelcomePage } from '@/hooks/useRedirectToWelcomePage'
import { AppLayout } from '@/layouts/app-layout'
import { WelcomeLayout } from '@/layouts/welcome-layout'
import { Alert } from '@mui/joy'
import { SettingsModal } from '../layouts/settings-layout'
import { FormationPage } from './routes/cv-forms/formation-page'
import { ProjectsPage } from './routes/cv-forms/projects-page'
import { SectorsPage } from './routes/cv-forms/sectors-page'
import { DebugModal } from './routes/debug/debug-modal'
import { LanguageSettings } from './routes/settings/language-settings'
import { ThemesSettings } from './routes/settings/themes-settings'
import { TranslatorSettings } from './routes/settings/translator-settings'
import { SummaryPage } from './routes/summary-page'
import { WelcomePage } from './routes/welcome-page'

export const AppRouter = () => {
  const { isLoadingGenerate } = useMenuEvents()
  const modal = useNavigateToModal()

  useRedirectToWelcomePage()
  useNavigationLogger()

  return (
    <>
      <UpdaterContainer open={modal.isOpen('updater')} onClose={modal.close} />
      <DebugModal open={modal.isOpen('debug')} onClose={modal.close} />

      <SettingsModal
        open={modal.isOpen('settings')}
        onClose={modal.close}
        children={<TranslatorSettings />}
      />
      <SettingsModal
        open={modal.isOpen('settings-translate')}
        onClose={modal.close}
        children={<TranslatorSettings />}
      />
      <SettingsModal
        open={modal.isOpen('settings-themes')}
        onClose={modal.close}
        children={<ThemesSettings />}
      />
      <SettingsModal
        open={modal.isOpen('settings-language')}
        onClose={modal.close}
        children={<LanguageSettings />}
      />

      <Routes>
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
    </>
  )
}
