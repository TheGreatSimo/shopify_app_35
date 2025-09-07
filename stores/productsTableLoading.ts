import { create } from 'zustand';

interface ProductsTableLoadingStoreType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  shouldRerender: boolean;
  setShouldRerender: (shouldRerender: boolean) => void;
}

export const useProductsTableLoadingStore = create<ProductsTableLoadingStoreType>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  shouldRerender: false,
  setShouldRerender: (shouldRerender: boolean) => set({ shouldRerender }),
}));