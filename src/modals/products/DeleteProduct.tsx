import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { Bleed, Box, Spinner, Text } from "@shopify/polaris";
import { useState } from "react";
import { useDeleteProductStore } from "stores/deleteProductStore";
import { useProductsTableDataStore } from "stores/productsTableData";

export const DeleteProduct = () => {
  const { deleteProductId, setDeleteProductId } = useDeleteProductStore();
  const { deleteProduct} = useProductsTableDataStore();

  const [isLoading, setIsLoading] = useState(false);
  const handleCancel = () => {
    shopify.modal.hide("DeleteProduct");
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("productId", deleteProductId);
      const response = await fetch(`/api/deleteProduct`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        deleteProduct(deleteProductId);
        shopify.modal.hide("DeleteProduct");
        shopify.toast.show("Rental configuration deleted successfully");
        setDeleteProductId("");
        setIsLoading(false);
      } else {
        shopify.modal.hide("DeleteProduct");
        shopify.toast.show("Error deleting rental configuration, please try again", {isError: true});
        setIsLoading(false);
        setDeleteProductId("");
      }
    } catch (error) {
      shopify.toast.show("Error deleting rental configuration, please try again", {isError: true});
    }

  
  };
  return (
    <>
      <Modal id="DeleteProduct">
        {isLoading ? (
          <Box padding="400">
            <Text as="p" variant="headingMd">Deleting rental configuration...</Text>
            <Spinner size="large" />
          </Box>
        ) : (
          <Box padding="400">
            <Text as="p" variant="headingMd">Permanently delete rental configuration for this product? This won't remove the product from your Shopify store. This action cannot be undone.</Text>
          </Box>
        )}

        <TitleBar title="Delete rental configuration">
          <button variant="primary" tone="critical" onClick={handleDelete}>Delete configuration</button>
          <button onClick={handleCancel}>Cancel</button>
        </TitleBar>
      </Modal>
    </>
  );
};