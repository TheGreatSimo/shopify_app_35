import { create } from 'zustand';
import { ShopifyProduct } from 'src/types/shopify';

interface Option {
  name: string;
  optionId: string;
}

interface CurrentProductStoreType {
  productId: string| null;
  setProductId: (id: string) => void;
  productTitle: string;
  setProductTitle: (title: string) => void;
  setProductThumbnail: (thumbnail: string) => void;
  productThumbnail: string;
  productDailyPrice: number | null;
  setProductDailyPrice: (price: number) => void;
  setProductMinDays: (days: number) => void;
  productMinDays: number;
  setProductMaxDays: (days: number) => void;
  productMaxDays: number;
  rentalEnabled: boolean;
  setRentalEnabled: (enabled: boolean) => void;
  actionType : 'add' | 'update';
  setActionType: (type: 'add' | 'update') => void;
  options: Option[];
  setOptions: (options: Option[]) => void;
  appendOption: (option: Option) => void;
  product: ShopifyProduct | null;
  setProduct: (product: ShopifyProduct) => void;
  selectedVariantId: string | null;
  setSelectedVariantId: (variantId: string) => void;
  hasRentalVariant: boolean;
  setHasRentalVariant: (hasRentalVariant: boolean) => void;
  reset: () => void;

}

export const useCurrentProductStore = create<CurrentProductStoreType>()((set) => ({
  productId: null,
  setProductId: (id: string) => set({ productId: id }),
  productTitle: '',
  setProductTitle: (title: string) => set({ productTitle: title }),
  productThumbnail: '',
  setProductThumbnail: (thumbnail: string) => set({ productThumbnail: thumbnail }),
  productDailyPrice: null,
  setProductDailyPrice: (price: number) => set({ productDailyPrice: price }),
  productMinDays: 1,
  setProductMinDays: (days: number) => set({ productMinDays: days }),
  productMaxDays: 30,
  setProductMaxDays: (days: number) => set({ productMaxDays: days }), 
  rentalEnabled: true,
  setRentalEnabled: (enabled: boolean) => set({ rentalEnabled: enabled }),
  actionType: 'add',
  setActionType: (type: 'add' | 'update') => set({ actionType: type }),
  options: [],
  setOptions: (options: Option[]) => set({ options }),
  appendOption: (option: Option) => set((state) => ({ options: [...state.options, option] })),
  product: null,
  setProduct: (product: ShopifyProduct) => set({ product }),
  selectedVariantId: null,
  setSelectedVariantId: (variantId: string) => set({ selectedVariantId: variantId }),
  hasRentalVariant: false,
  setHasRentalVariant: (hasRentalVariant: boolean) => set({ hasRentalVariant }),
  reset: () => set({
    productId: null,
    productTitle: '',
    productThumbnail: '',
    productDailyPrice: null,
    productMinDays: 1,
    productMaxDays: 30,
    rentalEnabled: true,
    selectedVariantId: null,
    hasRentalVariant: false,
  }),
}));