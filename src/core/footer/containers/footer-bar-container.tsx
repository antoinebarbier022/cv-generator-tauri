import { useFormStore } from '@/shared/stores/useFormStore'

import { useTranslatorOption } from '@/features/translators/hooks/useTranslatorOption'

import { useFormWarnings } from '@/core/warnings/hooks/useFormWarnings'
import { useUpdaterStore } from '@/features/updater/stores/updater.store'
import { AppUpdaterStatus } from '@/features/updater/types/updater.types'
import { ErrorOutline } from '@mui/icons-material'
import { CircularProgress, Sheet, Stack, Typography } from '@mui/joy'
import { FooterItem } from '../components/footer-item'
import { FooterItemLastUpdated } from '../components/footer-item-last-updated'
import { FooterItemOptionTranslate } from '../components/footer-item-option-translate'
import { FooterItemOutputPath } from '../components/footer-item-output-path'
import { FooterItemTheme } from '../components/footer-item-theme'
import { FooterItemWarningsCounter } from '../components/footer-item-warning-counter'

const configFooterOptions = {
  showErrors: true,
  showLastUpdate: false,
  showOutputPathGeneratedFile: false
}

export const FooterBarContainer = () => {
  const { lastUpdated } = useFormStore()

  const { countWarnings } = useFormWarnings()

  const showWarnings = Boolean(countWarnings && countWarnings >= 1)

  const { isActiveOptionValid } = useTranslatorOption()

  const { downloadedLength, totalUpdateLength, status } = useUpdaterStore()

  const updaterProgression =
    downloadedLength && totalUpdateLength
      ? Math.round((downloadedLength / totalUpdateLength) * 100)
      : 0

  return (
    <Stack
      direction={'row'}
      component={Sheet}
      variant="solid"
      gap={1}
      justifyContent={'end'}
      sx={{
        width: 'calc(100%)',
        background: 'transparent',
        position: 'absolute',
        bottom: -1,
        height: 'calc(var(--app-footer-height) + var(--app-border-width))',
        paddingRight: 'calc(0.5rem + var(--app-border-width))',
        py: 0.5
      }}
      invertedColors
    >
      <Stack data-tauri-drag-region sx={{ flex: 1 }}></Stack>

      <Stack
        component={Typography}
        level="body-xs"
        fontWeight={400}
        textColor={'text.secondary'}
        direction={'row'}
        alignItems={'center'}
        sx={{ cursor: 'default' }}
        gap={0.5}
      >
        {(status === AppUpdaterStatus.DOWNLOAD_ERROR ||
          status === AppUpdaterStatus.DOWNLOADING_UPDATE) && (
          <FooterItem isOpenModalRouter to={'updater'}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              {status !== AppUpdaterStatus.DOWNLOAD_ERROR ? (
                <CircularProgress
                  sx={{
                    '--CircularProgress-size': '12px',
                    '--CircularProgress-trackThickness': '2px',
                    '--CircularProgress-progressThickness': '2px'
                  }}
                />
              ) : (
                <ErrorOutline fontSize="inherit" />
              )}
              Update progression : {updaterProgression} %{' '}
            </Stack>
          </FooterItem>
        )}
        <FooterItemTheme />
        <FooterItemOptionTranslate isActive={isActiveOptionValid} />
        {configFooterOptions.showOutputPathGeneratedFile && (
          <>
            <FooterItemOutputPath path="/Users/antoinebarbier/Downloads/CV_Barbier_Antoine_CDT.pptx" />
          </>
        )}

        {showWarnings && (
          <>
            <FooterItemWarningsCounter
              loading={countWarnings !== null}
              count={countWarnings ?? 0}
            />
          </>
        )}

        {lastUpdated && (
          <>
            <FooterItemLastUpdated date={lastUpdated} />
          </>
        )}
      </Stack>
    </Stack>
  )
}
