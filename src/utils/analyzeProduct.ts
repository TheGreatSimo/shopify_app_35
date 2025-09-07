import { ShopifyProduct } from "src/types/shopify";

interface Option {
  name: string;
  optionId: string;
}

interface analyzeProductResult {
  isSingleVariant: boolean;
  options: Option[];
}

export const analyzeProduct = (product: ShopifyProduct): analyzeProductResult => {
  const meaningfulOptions = product.options.filter((opt) => 
    opt.name !== 'Title' || opt.values.length > 1 || opt.values[0] !== 'Default Title'
  );

  const isSingleVariant = product.variants.length === 1;
  if (isSingleVariant) {
    return {
      isSingleVariant: true,
      options: [
        {
          name: product.options[0].name,
          optionId: product.options[0].id,
        },
      ],
    };
  }

  return {
    isSingleVariant: false,
    options: meaningfulOptions.map(opt => ({
      name: opt.name,
      optionId: opt.id,
    })),
  };
}
