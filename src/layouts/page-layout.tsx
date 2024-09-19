import { Alert, Chip, Container, Divider, Stack, Typography } from '@mui/joy'
import { forwardRef, PropsWithChildren, ReactNode } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

interface Props extends PropsWithChildren {
  title?: string
  chip?: string
  endDecorator?: ReactNode
}
export const PageLayout = forwardRef<HTMLDivElement, Props>(
  ({ title, chip, endDecorator, children, ...props }, ref) => {
    const fallbackRender = ({ error }: FallbackProps) => {
      return (
        <Alert color="danger">
          <Stack gap={1}>
            <p className="m-0">Something went wrong...</p>
            <pre className="m-0">{error.message}</pre>
          </Stack>
        </Alert>
      )
    }

    return (
      <Stack ref={ref} {...props} component={Container} gap={4} sx={{ flex: 1 }}>
        {title && (
          <Stack gap={1} sx={{ userSelect: 'none' }}>
            <Stack>
              <Typography
                endDecorator={
                  chip && (
                    <Chip size="md" sx={{ marginTop: '6px', borderRadius: 'lg' }}>
                      {chip}
                    </Chip>
                  )
                }
                sx={{ cursor: 'default' }}
                slotProps={{
                  endDecorator: {
                    sx: {
                      alignSelf: 'center'
                    }
                  }
                }}
                level="h2"
              >
                {title}
              </Typography>

              <Stack
                sx={{
                  position: 'fixed',
                  top: '2rem',
                  right: '2rem',
                  zIndex: 10
                }}
              >
                {endDecorator}
              </Stack>
            </Stack>

            <Divider />
          </Stack>
        )}
        <ErrorBoundary fallbackRender={fallbackRender}>
          <Stack sx={{ flex: 1 }} paddingBottom={4}>
            {children}
          </Stack>
        </ErrorBoundary>
      </Stack>
    )
  }
)
