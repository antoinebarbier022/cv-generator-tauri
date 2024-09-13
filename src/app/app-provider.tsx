import { BetaBadge } from '@/components/beta-badge'
import '@/configs/i18n.config'

/* eslint-disable import/order */
import 'react-toastify/dist/ReactToastify.css'
/* eslint-enable import/order */

import '@/styles/index.css'
import themeCapgemini from '@/themes/capgemini-theme.ts'
import themeFrog from '@/themes/default-theme.ts'

import { useErrors } from '@/errors/hooks/useErrors'
import { useAppTheme } from '@/features/themes/hooks/useAppTheme'
import { useServerPort } from '@/hooks/userServerPort'
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export const AppProvider = ({ children }: PropsWithChildren) => {
  useErrors()

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {}
    }
  })
  console.log({ themeFrog })
  console.log({ themeCapgemini })
  const { appThemeConfig } = useAppTheme()

  useServerPort()

  return (
    <CssVarsProvider
      theme={appThemeConfig}
      defaultMode="light"
      modeStorageKey="joy-mode-scheme-light"
    >
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BetaBadge />
        <ToastContainer
          limit={2}
          position="bottom-right"
          theme="colored"
          newestOnTop
          draggable
          closeOnClick
        />
        <BrowserRouter>{children}</BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </QueryClientProvider>
    </CssVarsProvider>
  )
}
