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

import { useAskOutputPath } from '@/features/generation/hooks/useAskOutputPath'
import { useGenerate } from '@/features/generation/hooks/useGenerate'
import { useFormCV } from '@/hooks/useFormCV'
import { useServerPort } from '@/hooks/userServerPort'
import { useSidebarStore } from '@/stores/useSidebarStore'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavigationType } from '../../../types/sidebar'
import { MissingFontAlert } from '../../missing-font/components/missing-font-alert'
import { MissingFontModal } from '../../missing-font/components/missing-font-modal'
import { useMissingFont } from '../../missing-font/hooks/useMissingFont'
import { NavigationList } from '../components/navigation-list'
import { ProfileButtonCard } from '../components/profile-button-card'

interface Props {
  isLoadingGenerate?: boolean
}
export const SidebarContainer = ({ isLoadingGenerate }: Props) => {
  const { t } = useTranslation()

  const { isCollapsed: isCollapsedSidebar } = useSidebarStore()

  const askOutputPath = useAskOutputPath()
  const generate = useGenerate()

  const { port: apiPort } = useServerPort()

  const { formValues } = useFormCV()

  const [isOpenModalMissingFont, setOpenModalMissingFont] = useState(false)

  const handleOpenModalMissingFont = () => setOpenModalMissingFont(true)
  const handleCloseModalMissingFont = () => setOpenModalMissingFont(false)

  const fullName = useMemo(() => {
    const firstname = formValues.firstname
    const lastname = formValues.lastname
    if (Boolean(firstname) && Boolean(lastname)) {
      return `${firstname} ${lastname}`
    } else if (Boolean(firstname)) {
      return `${firstname}`
    } else if (Boolean(lastname)) {
      return `${lastname}`
    } else {
      return ''
    }
  }, [formValues.firstname, formValues.lastname])

  const role = formValues.role

  const handleGenerateCV = () => {
    askOutputPath.mutate(undefined, {
      onSettled: () => {},
      onSuccess: (outputFilePath) => {
        if (outputFilePath) {
          apiPort && generate.mutate({ outputFilePath, api_port: apiPort })
        }
      }
    })
  }

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
              fullName={Boolean(fullName) ? fullName : ''}
              linkTo={'/my-account'}
            />
            <Divider sx={{ mt: 1.5, mb: 1, mx: 1 }} />
          </Stack>
          <Stack>
            <NavigationList navigation={navigation} />
          </Stack>

          <Stack data-tauri-drag-region sx={{ flex: 1 }}></Stack>

          <Stack gap={1} sx={{ position: 'sticky', bottom: '0' }}>
            {showAlertMissingFont && <MissingFontAlert onClick={handleOpenModalMissingFont} />}
            <Button
              color="primary"
              variant="solid"
              loading={generate.isPending || isLoadingGenerate}
              onClick={handleGenerateCV}
            >
              {isCollapsedSidebar ? <DownloadRounded /> : t('button.generate.label')}
            </Button>
          </Stack>
        </Stack>
      </Sheet>
      <MissingFontModal open={isOpenModalMissingFont} onClose={handleCloseModalMissingFont} />
    </>
  )
}
