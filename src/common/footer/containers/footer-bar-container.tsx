import { StorageService } from '@/services/StorageService'
import { useWarningsStore } from '@/stores/useWarningsStore'
import { Divider, Sheet, Stack, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FooterItemLastUpdated } from '../components/footer-item-last-updated'
import { FooterItemOutputPath } from '../components/footer-item-output-path'
import { FooterItemWarningsCounter } from '../components/footer-item-warning-counter'

const configFooterOptions = {
  showErrors: true,
  showLastUpdate: false,
  showOutputPathGeneratedFile: false
}

export const FooterBarContainer = () => {
  const { countWarnings } = useWarningsStore()

  const lastModifiedDateFile = useQuery({
    queryKey: ['lastModifiedAt'],
    queryFn: () => StorageService.getLastModified()
  })

  console.log(lastModifiedDateFile)

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

        {lastModifiedDateFile.data && (
          <>
            {' '}
            <FooterItemLastUpdated date={lastModifiedDateFile.data} />
            <Divider orientation="vertical" />
          </>
        )}

        {configFooterOptions.showErrors && <FooterItemWarningsCounter count={countWarnings} />}
      </Stack>
    </Stack>
  )
}
