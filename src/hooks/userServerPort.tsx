import { invoke } from '@tauri-apps/api/tauri'
import { useEffect } from 'react'
import { create } from 'zustand'

interface State {
  apiPort: string | null
  setApiPort: (value: string | null) => void
}

const useApiPortStore = create<State>((set) => ({
  apiPort: localStorage.getItem('server-api-port'),
  setApiPort: (value: string | null) => {
    if (value === null) {
      localStorage.removeItem('server-api-port')
    } else {
      localStorage.setItem('server-api-port', value)
    }

    set(() => ({ apiPort: value }))
  }
}))

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
