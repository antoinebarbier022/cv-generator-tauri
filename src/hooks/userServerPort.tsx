import { invoke } from '@tauri-apps/api/tauri'
import { useEffect } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface State {
  apiPort: string | null
  setApiPort: (value: string | null) => void
}

const useApiPortStore = create(
  persist<State>(
    (set) => ({
      apiPort: null,
      setApiPort: (value: string | null) => {
        set(() => ({ apiPort: value }))
      }
    }),
    {
      name: 'server-api-port',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export const useServerPort = () => {
  const { apiPort, setApiPort } = useApiPortStore()

  useEffect(() => {
    if (!apiPort) {
      invoke('get_backend_port')
        .then((result) => setApiPort(result as string))
        .catch(() => setApiPort(null))
    }
  }, [])

  return {
    port: apiPort,
    setPort: setApiPort
  }
}
