import { create } from 'zustand'


interface State {
  expandedItem: string | undefined
  setExpandedItem: (id: string | undefined) => void
}

export const useExpandedItemStore = create<State>((set) => ({
  expandedItem: undefined,
  setExpandedItem: (id: string | undefined) => {
    console.trace("Expanded item : " + id)
    set(() => ({ expandedItem: id }))
  }
}))
