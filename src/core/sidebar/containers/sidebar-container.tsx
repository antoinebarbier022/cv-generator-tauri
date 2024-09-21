import {
  BusinessRounded,
  Construction,
  DownloadRounded,
  HandymanRounded,
  HomeRepairServiceRounded,
  LanguageRounded,
  PersonRounded,
  SchoolRounded,
  TimelineRounded
} from '@mui/icons-material'
import { Button, Divider, Sheet, Stack } from '@mui/joy'

import { useFormCV } from '@/shared/hooks/useFormCV'

import { useNavigateToModal } from '@/app/router/useNavigateToModal'
import { MenuEvent } from '@/generated/events/menu-events'
import { emit } from '@tauri-apps/api/event'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { MissingFontAlert } from '../../../features/missing-font/components/missing-font-alert'
import { useMissingFont } from '../../../features/missing-font/hooks/useMissingFont'
import { NavigationList } from '../components/navigation-list'
import { ProfileButtonCard } from '../components/profile-button-card'
import { useSidebarStore } from '../stores/useSidebarStore'
import { NavigationType } from '../types/sidebar'

interface Props {
  isLoadingGenerate?: boolean
}
export const SidebarContainer = ({ isLoadingGenerate }: Props) => {
  const { t } = useTranslation()

  const { isCollapsed: isCollapsedSidebar } = useSidebarStore()

  const { formValues } = useFormCV()

  const modal = useNavigateToModal()

  const fullName = useMemo(() => {
    const firstname = formValues.firstname
    const lastname = formValues.lastname
    if (Boolean(firstname) && Boolean(lastname)) {
      return `${firstname} ${lastname}`
    } else if (firstname) {
      return `${firstname}`
    } else if (lastname) {
      return `${lastname}`
    } else {
      return ''
    }
  }, [formValues.firstname, formValues.lastname])

  const role = formValues.role

  const navigation: NavigationType[] = [
    {
      icon: <PersonRounded />,
      label: t('sidebar.navigation.profile'),
      to: '/profile'
    },
    {
      icon: <HomeRepairServiceRounded />,
      label: t('sidebar.navigation.skills'),
      to: '/skills'
    },
    {
      icon: <HandymanRounded />,
      label: t('sidebar.navigation.sectors'),
      to: '/sectors'
    },
    {
      icon: <SchoolRounded />,
      label: t('sidebar.navigation.formation'),
      to: '/formation'
    },
    {
      icon: <LanguageRounded />,
      label: t('sidebar.navigation.languages'),
      to: '/languages'
    },
    {
      icon: <TimelineRounded />,
      label: t('sidebar.navigation.employment_history'),
      to: '/employment_history'
    },
    {
      icon: <BusinessRounded />,
      label: t('sidebar.navigation.projects'),
      to: '/projects',
      divider: false
    },
    {
      icon: <Construction />,
      label: t('sidebar.navigation.cv-configuration'),
      to: '/cv-configuration',
      hide: true
    }
  ]

  const { showAlertMissingFont } = useMissingFont()

  return (
    <>
      <Sheet
        component={Stack}
        color="primary"
        variant="solid"
        invertedColors
        sx={{
          position: 'relative',
          width: isCollapsedSidebar ? '65px' : 'var(--app-sidebar-width)',
          backgroundColor: 'transparent',
          transition: 'width 100ms linear',
          height: '100%'
        }}
      >
        <Stack
          data-tauri-drag-region
          sx={{
            height: '2rem',
            minHeight: '2rem',
            paddingX: 'var(--app-border-width)'
          }}
        />

        <Stack
          height={'100%'}
          justifyContent={'space-between'}
          paddingX={'var(--app-border-width)'}
          position={'relative'}
        >
          <Stack>
            <ProfileButtonCard
              isCollapseSidebar={isCollapsedSidebar}
              image={formValues.picture}
              subtile={role.fr}
              fullName={fullName ? fullName : ''}
              linkTo={'/my-account'}
            />
            <Divider sx={{ mt: 1.5, mb: 1, mx: 1 }} />
          </Stack>
          <Stack>
            <NavigationList navigation={navigation} />
          </Stack>

          <Stack data-tauri-drag-region sx={{ flex: 1 }}></Stack>

          <Stack gap={1} sx={{ position: 'sticky', bottom: '0' }}>
            {showAlertMissingFont && (
              <MissingFontAlert onClick={() => modal.open('missing-font')} />
            )}
            <Button
              color="primary"
              variant="solid"
              sx={{ height: '2.25rem' }}
              loading={isLoadingGenerate}
              onClick={() => emit(MenuEvent.FileGenerateAndSaveAs)}
              className="@container"
            >
              <Stack height={'100%'} className="!block @[10ch]:!hidden">
                <DownloadRounded sx={{ height: '100%' }} />
              </Stack>

              <span className="hidden @[10ch]:block">{t('button.generate.label')}</span>
            </Button>
          </Stack>
        </Stack>
      </Sheet>
    </>
  )
}
