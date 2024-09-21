import { useFormStore } from '@/shared/stores/useFormStore'

import { useTranslatorOption } from '@/features/translators/hooks/useTranslatorOption'

import { useNavigateToModal } from '@/app/router/useNavigateToModal'
import { useFormWarnings } from '@/core/warnings/hooks/useFormWarnings'
import { useUpdaterStore } from '@/features/updater/stores/updater.store'
import { AppUpdaterStatus } from '@/features/updater/types/updater.types'
import { useAppTheme } from '@/shared/hooks/useAppTheme'
import { BrushRounded, ErrorOutline, TranslateRounded } from '@mui/icons-material'
import { CircularProgress, Sheet, Stack, Typography } from '@mui/joy'
import { useTranslation } from 'react-i18next'
import { FooterItem } from '../components/footer-item'
import { FooterItemLastUpdated } from '../components/footer-item-last-updated'
import { FooterItemOutputPath } from '../components/footer-item-output-path'
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

  const modal = useNavigateToModal()
  const { appTheme, overrideAppTheme } = useAppTheme()

  const { t } = useTranslation()
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
        {(status === AppUpdaterStatus.UPDATE_FAILED ||
          status === AppUpdaterStatus.DOWNLOADING_UPDATE) && (
          <FooterItem onClick={() => modal.open('updater')}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              {status !== AppUpdaterStatus.UPDATE_FAILED ? (
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
              Update progression : <span className="text-end w-[2ch]"> {updaterProgression}</span>%
              {''}
            </Stack>
          </FooterItem>
        )}

        <FooterItem
          icon={<BrushRounded fontSize="inherit" />}
          onClick={() => modal.open('settings-themes')}
        >
          {t('footer.theme', { state: overrideAppTheme || appTheme })}
        </FooterItem>

        <FooterItem
          icon={<TranslateRounded fontSize="inherit" />}
          onClick={() => modal.open('settings')}
        >
          {t('footer.option-translate', {
            state: isActiveOptionValid ? t('core.enabled') : t('core.disabled')
          })}
        </FooterItem>
        {configFooterOptions.showOutputPathGeneratedFile && (
          <>
            <FooterItemOutputPath path="/Users/antoinebarbier/Downloads/CV_Barbier_Antoine_CDT.pptx" />
          </>
        )}

        {showWarnings && (
          <>
            <FooterItemWarningsCounter
              loading={countWarnings === null}
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
