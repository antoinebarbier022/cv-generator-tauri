import {
  BusinessRounded,
  Construction,
  HandymanRounded,
  HomeRepairServiceRounded,
  LanguageRounded,
  PersonRounded,
  SchoolRounded,
  TimelineRounded
} from '@mui/icons-material'
import { Button, Sheet, Stack } from '@mui/joy'

import { useAskOutputPath } from '@/features/generation/hooks/useAskOutputPath'
import { useGenerate } from '@/features/generation/hooks/useGenerate'
import { useGetDataStorage } from '@/hooks/useGetDataStorage'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CardProfileButton } from '../components/CardProfileButton'
import { MissingFontAlert } from '../components/MissingFontAlert'
import { MissingFontModal } from '../components/MissingFontModal'
import { NavigationList } from '../components/NavigationList'
import { useMissingFont } from '../hooks/useMissingFont'
import { NavigationType } from '../types/sidebar'

interface Props {
  isLoadingGenerate?: boolean
}
export const SidebarContainer = ({ isLoadingGenerate }: Props) => {
  const { t } = useTranslation()

  const askOutputPath = useAskOutputPath()
  const generate = useGenerate()
  const contentResume = useGetDataStorage()

  const [isOpenModalMissingFont, setOpenModalMissingFont] = useState(false)

  const handleOpenModalMissingFont = () => setOpenModalMissingFont(true)
  const handleCloseModalMissingFont = () => setOpenModalMissingFont(false)

  const fullName = useMemo(() => {
    const firstname = contentResume.data?.firstname
    const lastname = contentResume.data?.lastname
    if (Boolean(firstname) && Boolean(lastname)) {
      return `${contentResume.data?.firstname} ${contentResume.data?.lastname}`
    } else if (Boolean(firstname)) {
      return `${contentResume.data?.firstname}`
    } else if (Boolean(lastname)) {
      return `${contentResume.data?.lastname}`
    } else {
      return ''
    }
  }, [contentResume.data?.firstname, contentResume.data?.lastname])

  const handleGenerateCV = () => {
    askOutputPath.mutate(undefined, {
      onSettled: () => {},
      onSuccess: (data) => {
        if (data) {
          generate.mutate(data)
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
        sx={{ backgroundColor: 'transparent', height: '100%' }}
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
          <CardProfileButton
            image={contentResume.data?.picture}
            fullName={Boolean(fullName) ? fullName : ''}
            linkTo={'/my-account'}
          />

          <NavigationList navigation={navigation} />

          <Stack gap={1} sx={{ position: 'sticky', bottom: '0' }}>
            {showAlertMissingFont && <MissingFontAlert onClick={handleOpenModalMissingFont} />}
            <Button
              color="primary"
              variant="solid"
              //sx={{ marginX: 1 }}
              loading={generate.isPending || isLoadingGenerate}
              onClick={handleGenerateCV}
            >
              {t('button.generate.label')}
            </Button>
          </Stack>
        </Stack>
      </Sheet>
      <MissingFontModal open={isOpenModalMissingFont} onClose={handleCloseModalMissingFont} />
    </>
  )
}
