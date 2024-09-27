import { CssBaseline, CssVarsProvider } from '@mui/joy'
import type { Preview } from '@storybook/react'
import React, { Suspense, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import i18n from '../src/configs/i18n.config.ts'
import '../src/styles/index.css'
import theme from '../src/themes/default-theme.ts'

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      locale: 'fr',
      items: [
        { value: 'en', title: 'English', right: '🇬🇧' },
        { value: 'fr', title: 'French', right: '🇫🇷' }
      ],
      showName: true
    }
  }
}

const withI18next = (Story, context) => {
  const { locale } = context.globals

  // When the locale global changes
  // Set the new locale in i18n
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  )
}

const preview: Preview = {
  decorators: [
    withI18next,
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
