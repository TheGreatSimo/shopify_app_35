import { create } from 'zustand';

interface StoreCurrencyStoreType {
  currencyCode: string;
  setCurrencyCode: (currencyCode: string) => void;
}

export const useStoreCurrencyStore = create<StoreCurrencyStoreType>()((set) => ({
  currencyCode: "USD",
  setCurrencyCode: (currencyCode: string) => set({ currencyCode }),
}));