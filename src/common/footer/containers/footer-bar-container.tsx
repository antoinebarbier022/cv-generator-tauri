import { StorageService } from '@/services/StorageService'
import { useFormStore } from '@/stores/useFormStore'
import { useWarningsStore } from '@/stores/useWarningsStore'
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
  const { countWarnings } = useWarningsStore()

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
        position: 'absolute',
        bottom: 0,
        //left: "calc(var(--app-sidebar-width))",
        paddingRight: 'calc(0.5rem + var(--app-border-width)) ',
        py: 0.5,
        background: 'transparent'
      }}
      invertedColors
    >
      <Stack
        component={Typography}
        level="body-xs"
        fontWeight={400}
        textColor={'text.secondary'}
        direction={'row'}
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
            {' '}
            <FooterItemLastUpdated date={lastUpdated} />
            <Divider orientation="vertical" />
          </>
        )}

        {configFooterOptions.showErrors && <FooterItemWarningsCounter count={countWarnings} />}
      </Stack>
    </Stack>
  )
}
