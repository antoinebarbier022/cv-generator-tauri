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
        const currentReduce = get().isCollapsed
        set(() => ({ isCollapsed: !currentReduce }))
      },
      setCollapsed: (value: boolean) => {
        set(() => ({ isCollapsed: value }))
      }
    }),
    {
      name: 'sidebar',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
