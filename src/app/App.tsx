import { Stack } from '@mui/joy'
import { AppProvider } from './app-provider'
import { AppRouter } from './app-router'

const App = () => {
  return (
    <AppProvider>
      <Stack
        data-tauri-drag-region
        sx={{
          height: 'var(--titlebar-height)',
          userSelect: 'none'
        }}
      />
      <AppRouter />
    </AppProvider>
  )
}

export default App
