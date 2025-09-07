export interface ShopifyImage {
  id: string;
  originalSrc: string;
  altText?: string;
}

export interface ShopifyOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyVariant {
  id: string;
  price: string;
  selectedOptions: ShopifySelectedOption[];
  inventoryQuantity: number;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  productType: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: string;
  tags: string[];
  templateSuffix: string | null;
  availablePublicationCount: number;
  hasOnlyDefaultVariant: boolean;
  totalInventory: number;
  totalVariants: number;
  tracksInventory: boolean;
  images: ShopifyImage[];
  options: ShopifyOption[];
  variants: ShopifyVariant[];
} 