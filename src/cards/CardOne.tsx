import { CalloutCard } from "@shopify/polaris";
import { analyzeProduct } from "src/utils/analyzeProduct";
import { useCurrentProductStore } from "stores/currentProduct";
import { ShopifyProduct } from "src/types/shopify";

export const CardOne = () => {
  const { setProductTitle, setProductId, setProductThumbnail, setProductDailyPrice, setActionType, setOptions, setProduct } = useCurrentProductStore();
  const handleSelectProducts = async () => {
    setActionType('add');
    const selected = await shopify.resourcePicker({
      type: "product",
      multiple: false,
      filter: { variants: false },
    });
    if (!selected || selected.length === 0) return;
    
    const product = selected[0] as unknown as ShopifyProduct;
    console.log("the selected product is", product);
    
    if (product.variants && product.variants.length > 0) {
      setProductDailyPrice(parseFloat(product.variants[0].price));
    }
    
    setProductTitle(product.title);
    setProductId(product.id);
    
    if (product.images && product.images.length > 0) {
      setProductThumbnail(product.images[0].originalSrc);
    }
    
    setProduct(product);
    const { isSingleVariant, options } = analyzeProduct(product);
    if (isSingleVariant) {
      setOptions(options);
      shopify.modal.show("AddProductModal");
    } else {
      shopify.modal.show("VariantSelector");
    }
  }
  return (
    <CalloutCard
      title="Make a product rentable"
      illustration="https://cdn.shopify.com/s/files/1/0773/4742/2461/files/8359747.png?v=1755791238"
      primaryAction={{
        content: "Choose product",
        onAction: handleSelectProducts,
      }}
    >
      <p>Select a product from your store and configure its rental settings like daily price and rental duration.</p>
    </CalloutCard>
  );
};
