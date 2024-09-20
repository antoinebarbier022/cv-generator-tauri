import { create } from 'zustand'

interface State {
  expandedItem: string | undefined
  setExpandedItem: (id: string | undefined) => void
}

export const useExpandedItemStore = create<State>((set, get) => ({
  expandedItem: undefined,
  setExpandedItem: (id: string | undefined) => {
    if (get().expandedItem !== id) {
      console.debug('Expanded item : ' + id)
      set(() => ({ expandedItem: id }))
    }
  }
}))
