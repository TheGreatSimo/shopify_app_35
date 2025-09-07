import { create } from 'zustand';

interface Product {
  id: string;
  title: string;
  thumbnail: string;
  minDays: number;
  maxDays: number;
  dailyPrice: number;
  shop: string;
  shopifyProductId: string;
  isRentalEnabled: boolean;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductsTableDataStoreType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

export const useProductsTableDataStore = create<ProductsTableDataStoreType>()((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (product) => set((state) => ({ products: state.products.map((p) => (p.id === product.id ? product : p)) })),
  deleteProduct: (id) => set((state) => ({ products: state.products.filter((product) => product.id !== id) })),
}));