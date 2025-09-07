import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { Card, RadioButton, TextField, Text, BlockStack, InlineStack, Divider } from "@shopify/polaris";
import { useCurrentProductStore } from "stores/currentProduct";
import { useState } from "react";
import { ShopifyProduct, ShopifyVariant, ShopifySelectedOption, ShopifyOption } from "src/types/shopify";

export const VariantSelector = () => {
  const { product, setProductDailyPrice, productDailyPrice, selectedVariantId, setSelectedVariantId, setOptions } = useCurrentProductStore();
  
  const handleCancel = () => {
    shopify.modal.hide("VariantSelector");
  };

  const handleCreateRentalVariant = () => {
    if (selectedVariantId && product) {
      const selectedVariant = product.variants?.find((variant: ShopifyVariant) => variant.id === selectedVariantId);
      if (selectedVariant && selectedVariant.selectedOptions && product.options) {
        console.log("Product options:", product.options);
        console.log("Selected variant:", selectedVariant);
        console.log("Selected options:", selectedVariant.selectedOptions);
        
        const options = selectedVariant.selectedOptions.map((selectedOption: ShopifySelectedOption, index: number) => {
          // Try to match by index first, since the order should correspond
          const productOption = product.options[index];
          console.log(`Mapping selectedOption ${selectedOption.name} (value: ${selectedOption.value}) to productOption:`, productOption);
          
          return {
            name: selectedOption.value, // This should be the actual value like "Powder", "Large", etc.
            optionId: productOption?.id || '',
          };
        });
        console.log(" the optiosn are this ", options);
        setOptions(options);
      }
      
      shopify.modal.hide("VariantSelector");
      shopify.modal.show("AddProductModal");
    }
  };

  const formatPrice = (price: string) => {
    return parseFloat(price).toFixed(2);
  };

  const getVariantDisplayName = (variant: ShopifyVariant) => {
    if (!variant.selectedOptions || variant.selectedOptions.length === 0) {
      return "Default";
    }
    return variant.selectedOptions
      .map((option) => option.value)
      .join(" / ");
  };

  const getVariantStock = (variant: ShopifyVariant) => {
    return variant.inventoryQuantity || 0;
  };

  return (
    <>
      <Modal id="VariantSelector">
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">
              Choose Variant to Rent
            </Text>
            
            <Text variant="bodyMd" as="p" tone="subdued">
              This product has multiple variants. Select which specific combination you want to make available for rental.
            </Text>

            <Divider />

            <Text variant="headingMd" as="h3">
              Available Variants:
            </Text>

            <BlockStack gap="300">
              {product?.variants?.map((variant: ShopifyVariant) => (
                <RadioButton
                  key={variant.id}
                  id={variant.id}
                  label={
                    <InlineStack align="space-between" blockAlign="center">
                      <BlockStack gap="100">
                        <Text variant="bodyMd" as="span">
                          {getVariantDisplayName(variant)} - ${formatPrice(variant.price)}
                        </Text>
                        <Text variant="bodySm" as="span" tone="subdued">
                          Stock: {getVariantStock(variant)} available
                        </Text>
                      </BlockStack>
                    </InlineStack>
                  }
                  checked={selectedVariantId === variant.id}
                  onChange={() => setSelectedVariantId(variant.id)}
                />
              ))}
            </BlockStack>

          </BlockStack>
        </Card>

        <TitleBar title="Choose Variant to Rent">
          <button 
            variant="primary" 
            onClick={handleCreateRentalVariant}
            disabled={!selectedVariantId }
          >
            Create Rental Variant
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </TitleBar>
      </Modal>
    </>
  );
};