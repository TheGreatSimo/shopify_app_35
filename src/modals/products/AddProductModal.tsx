import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useState } from "react";
import {
  Box,
  Bleed,
  SettingToggle,
  TextField,
  Text,
  BlockStack,
  InlineGrid,
  InlineStack,
  Card,
  Spinner,
} from "@shopify/polaris";
import { useCurrentProductStore } from "stores/currentProduct";
import { useStoreCurrencyStore } from "stores/storeCurrency";
import { useProductsTableDataStore } from "stores/productsTableData";
import Switch from "src/buttons/Switch";
import { handleResetCurrentProduct } from "stores/utils/handleResetCurrentProduct";

export const AddProductModal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currencyCode } = useStoreCurrencyStore();
  const {
    productTitle,
    productId,
    productThumbnail,
    productMinDays,
    setProductMinDays,
    productMaxDays,
    setProductMaxDays,
    productDailyPrice,
    setProductDailyPrice,
    rentalEnabled,
    setRentalEnabled,
    actionType,
    reset,
    options,
    hasRentalVariant,
    selectedVariantId,
  } = useCurrentProductStore();

  const { updateProduct, addProduct } = useProductsTableDataStore();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("isRentalEnabled", rentalEnabled.toString());
    formData.append("productId", productId!);
    formData.append("productThumbnail", productThumbnail);
    formData.append("productTitle", productTitle);
    formData.append("productDailyPrice", productDailyPrice!.toString());
    formData.append("productMinDays", productMinDays.toString());
    formData.append("productMaxDays", productMaxDays.toString());
    formData.append("options", JSON.stringify(options));
    formData.append("hasRentalVariant", hasRentalVariant.toString());
    if (selectedVariantId) {
      formData.append("rentVariantId", selectedVariantId);
    }
    const response = await fetch("/api/addProduct", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      shopify.toast.show("Failed to save rental settings", { isError: true });
      setIsSubmitting(false);
      shopify.modal.hide("AddProductModal");
      return;
    }
    if (data.success) {
      if (actionType === "update") {
        updateProduct({
          id: productId!,
          title: productTitle,
          thumbnail: productThumbnail,
          minDays: productMinDays,
          maxDays: productMaxDays,
          dailyPrice: productDailyPrice!,
          isRentalEnabled: rentalEnabled,
          shop: "",
          shopifyProductId: "",
          sessionId: "",
          createdAt: "",
          updatedAt: "",
        });
      } else if (actionType === "add") {
        addProduct({
          id: productId!,
          title: productTitle,
          thumbnail: productThumbnail,
          minDays: productMinDays,
          maxDays: productMaxDays,
          dailyPrice: productDailyPrice!,
          isRentalEnabled: rentalEnabled,
          shop: "",
          shopifyProductId: "",
          sessionId: "",
          createdAt: "",
          updatedAt: "",
        });
      }

      shopify.toast.show("Rental settings saved successfully");
      setIsSubmitting(false);
      shopify.modal.hide("AddProductModal");
      reset();
      return;
    }
  };

  const handleClose = () => {
    shopify.modal.hide("AddProductModal");
    reset();
  };

  return (
    <>
      <Modal id="AddProductModal" onHide={reset}>
        {isSubmitting ? (
          <Card padding="600">
            <BlockStack align="center" inlineAlign="center" gap="600">
              <Text as="p" variant="headingMd">
                Saving rental settings...
              </Text>
              <Spinner size="large" />
            </BlockStack>
          </Card>
        ) : (
          <Box padding={"400"}>
            <BlockStack gap="400">
              <InlineStack align="space-between" blockAlign="center">
                <BlockStack>
                  <Text as="h2">Enable rentals</Text>
                  <Text as="p" variant="bodyMd" tone="subdued">
                    Customers can rent this product instead of buying.
                  </Text>
                </BlockStack>
                <Switch
                  isEnabled={rentalEnabled}
                  setIsEnabled={setRentalEnabled}
                />
              </InlineStack>
              <TextField
                label={`Daily rental price (${currencyCode})`}
                type="number"
                placeholder="e.g. 15.00"
                value={productDailyPrice?.toString() || ""}
                onChange={(value) => setProductDailyPrice(parseFloat(value))}
                prefix={currencyCode}
                autoComplete="off"
              />

              <TextField
                label="Minimum rental days"
                type="number"
                value={productMinDays.toString()}
                onChange={(value) => setProductMinDays(parseInt(value, 10))}
                helpText="Default is 1 day."
                autoComplete="off"
              />

              <TextField
                label="Maximum rental days"
                type="number"
                value={productMaxDays.toString()}
                onChange={(value) => setProductMaxDays(parseInt(value, 10))}
                helpText="Default is 30 days."
                autoComplete="off"
              />
            </BlockStack>
          </Box>
        )}
        <TitleBar title={`Rental settings for ${productTitle}`}>
          <button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Save
          </button>
          <button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </button>
        </TitleBar>
      </Modal>
    </>
  );
};
