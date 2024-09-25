import { CssBaseline, CssVarsProvider } from '@mui/joy'
import type { Preview } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import '../src/styles/index.css'
import theme from '../src/themes/default-theme.ts'

const preview: Preview = {
  decorators: [
    (Story) => (
      <CssVarsProvider theme={theme} defaultMode="light" modeStorageKey="joy-mode-scheme-light">
        <CssBaseline />
        <BrowserRouter>
          <Story />
        </BrowserRouter>

        <ToastContainer
          limit={2}
          position="bottom-right"
          theme="colored"
          newestOnTop
          draggable
          closeOnClick
        />
      </CssVarsProvider>
    )
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
