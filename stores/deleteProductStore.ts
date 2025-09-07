import { create } from 'zustand';

interface DeleteProductStoreType {
  deleteProductId: string;
  setDeleteProductId: (productId: string) => void;
}

export const useDeleteProductStore = create<DeleteProductStoreType>()((set) => ({
  deleteProductId: "",
  setDeleteProductId: (productId: string) => set({ deleteProductId: productId }),
}));