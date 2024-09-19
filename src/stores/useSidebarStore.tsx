import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface State {
  isCollapsed: boolean
  setCollapsed: (value: boolean) => void
  toggle: () => void
}

export const useSidebarStore = create(
  persist<State>(
    (set, get) => ({
      isCollapsed: false,
      toggle: () => {
        const isCollapsed = get().isCollapsed
        console.debug(`Sidebar toggle to ${!isCollapsed ? 'collapsed' : 'expanded'} state.`)
        set(() => ({ isCollapsed: !isCollapsed }))
      },
      setCollapsed: (value: boolean) => {
        console.debug(`Sidebar set to ${value ? 'collapsed' : 'expanded'} state.`)
        set(() => ({ isCollapsed: value }))
      }
    }),
    {
      name: 'sidebar',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
