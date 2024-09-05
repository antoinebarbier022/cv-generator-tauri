import { BetaBadge } from '@/components/beta-badge'
import '@/configs/i18n.config'
import { useErrors } from '@/errors/hooks/useErrors'

import '@/styles/index.css'
import theme from '@/themes/default-theme.ts'
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export const AppProvider = ({ children }: PropsWithChildren) => {
  useErrors()

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {}
    }
  })
  return (
    <CssVarsProvider theme={theme} defaultMode="light" modeStorageKey="joy-mode-scheme-light">
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
