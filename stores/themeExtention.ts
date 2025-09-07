import { create } from 'zustand';

interface ThemeExtentionStoreType {
  themeExtentionURL: string;
  setThemeExtentionURL: (themeExtentionURL: string) => void;
}

export const useThemeExtentionStore = create<ThemeExtentionStoreType>()((set) => ({
  themeExtentionURL: '',
  setThemeExtentionURL: (themeExtentionURL: string) => set({ themeExtentionURL }),
}));