import { StorageService } from '@/services/StorageService'
import { useFormStore } from '@/stores/useFormStore'

import { useFormWarnings } from '@/hooks/useFormWarnings'
import { Divider, Sheet, Stack, Typography } from '@mui/joy'
import { useEffect } from 'react'
import { FooterItemLastUpdated } from '../components/footer-item-last-updated'
import { FooterItemOutputPath } from '../components/footer-item-output-path'
import { FooterItemWarningsCounter } from '../components/footer-item-warning-counter'

const configFooterOptions = {
  showErrors: true,
  showLastUpdate: false,
  showOutputPathGeneratedFile: false
}

export const FooterBarContainer = () => {
  const { lastUpdated, setLastUpdated } = useFormStore()

  const { countWarnings } = useFormWarnings()

  useEffect(() => {
    StorageService.getLastModified().then((data) => {
      setLastUpdated(data)
    })
  }, [])

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
        bottom: 0,
        height: 'calc(var(--app-footer-height) + var(--app-border-width))',
        paddingRight: 'calc(0.5rem + var(--app-border-width))',
        py: 0.5
      }}
      invertedColors
    >
      <Stack
        component={Typography}
        level="body-xs"
        fontWeight={400}
        textColor={'text.secondary'}
        direction={'row'}
        alignItems={'center'}
        sx={{ cursor: 'default' }}
        gap={1.5}
      >
        {configFooterOptions.showOutputPathGeneratedFile && (
          <>
            <FooterItemOutputPath path="/Users/antoinebarbier/Downloads/CV_Barbier_Antoine_CDT.pptx" />
            <Divider orientation="vertical" />
          </>
        )}

        {lastUpdated && (
          <>
            <FooterItemLastUpdated date={lastUpdated} />
            <Divider orientation="vertical" sx={{ height: '70%', alignSelf: 'center' }} />
          </>
        )}

        {configFooterOptions.showErrors && (
          <FooterItemWarningsCounter loading={countWarnings === null} count={countWarnings ?? 0} />
        )}
      </Stack>
    </Stack>
  )
}
