import { create } from "zustand";

interface State {
  countWarnings: number;
  setCountWarnings: (value: number) => void;
}

export const useWarningsStore = create<State>((set) => ({
  countWarnings: 0,
  setCountWarnings: (value: number) => {
    set(() => ({ countWarnings: value }));
  },
}));
