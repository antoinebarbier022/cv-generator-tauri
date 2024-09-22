import { Navigate, Route, Routes } from 'react-router-dom'

import { EmploymentHistoryPage } from '@/app/views/cv-forms/employment-history-page'
import { LanguagesPage } from '@/app/views/cv-forms/languages-page'
import { SkillsPage } from '@/app/views/cv-forms/skills-page'
import { FooterBarContainer } from '@/core/footer/containers/footer-bar-container'

import { ProfilePage } from '@/app/views/cv-forms/profile-page'

import { AppLayout } from '@/app/layouts/app-layout'
import { WelcomeLayout } from '@/app/views/welcome-page/layouts/welcome-layout'
import { useNavigationLogger } from '@/core/logs/useNavigationLogger'
import { UpdaterContainer } from '@/features/updater/containers/updater-container'

import { useMenuEvents } from '@/core/events/useMenuEvents'
import { SidebarContainer } from '@/core/sidebar/containers/sidebar-container'
import { MissingFontModal } from '@/features/missing-font/components/missing-font-modal'
import { useAutoDetectUpdater } from '@/features/updater/hooks/useAutoDetectUpdater'
import { Alert } from '@mui/joy'
import { SettingsModal } from '../features/settings/settings-layout'
import { useNavigateToModal } from './router/useNavigateToModal'
import { useRedirectToWelcomePage } from './router/useRedirectToWelcomePage'
import { FormationPage } from './views/cv-forms/formation-page'
import { ProjectsPage } from './views/cv-forms/projects-page'
import { SectorsPage } from './views/cv-forms/sectors-page'
import { DebugModal } from './views/debug/debug-modal'
import { LanguageSettings } from './views/settings/language-settings'
import { ThemesSettings } from './views/settings/themes-settings'
import { TranslatorSettings } from './views/settings/translator-settings'
import { SummaryPage } from './views/summary-page/summary-page'
import { WelcomePage } from './views/welcome-page/welcome-page'

export const AppRouter = () => {
  const { isLoadingGenerate } = useMenuEvents()
  const modal = useNavigateToModal()

  useRedirectToWelcomePage()
  useNavigationLogger()
  useAutoDetectUpdater()

  return (
    <>
      <UpdaterContainer open={modal.isOpen('updater')} onClose={modal.close} />
      <DebugModal open={modal.isOpen('debug')} onClose={modal.close} />
      <MissingFontModal open={modal.isOpen('missing-font')} onClose={modal.close} />
      <SettingsModal
        open={modal.isOpen([
          'settings',
          'settings-translate',
          'settings-themes',
          'settings-language'
        ])}
        onClose={modal.close}
      >
        {modal.isOpen('settings') && <TranslatorSettings />}
        {modal.isOpen('settings-translate') && <TranslatorSettings />}
        {modal.isOpen('settings-themes') && <ThemesSettings />}
        {modal.isOpen('settings-language') && <LanguageSettings />}
      </SettingsModal>

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
