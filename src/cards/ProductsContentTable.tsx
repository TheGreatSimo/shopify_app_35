/*
import { Card, Layout, Thumbnail, DataTable, Button, Text, Spinner } from "@shopify/polaris";
import { DeleteIcon, EditIcon } from '@shopify/polaris-icons';
import { useEffect, useState } from "react";
import { useCurrentProductStore } from "stores/currentProduct";
import { useProductsTableLoadingStore } from "stores/productsTableLoading";
import { useProductsTableDataStore } from "stores/productsTableData";

export const ProductsContentTable = () => {
  const { products, setProducts, deleteProduct, updateProduct } = useProductsTableDataStore();
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setIsLoading, shouldRerender, setShouldRerender } = useProductsTableLoadingStore();
  const { setProductId, setProductThumbnail, setProductDailyPrice, setProductMinDays, setProductMaxDays, setProductIsRentalEnabled } = useCurrentProductStore();

  useEffect(() => {
    if (!alreadyLoaded) {
      const fetchProducts = async () => {
        setIsLoading(true);
        const response = await fetch("/api/getProducts", {
          method: "GET",
        });
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
          setIsLoading(false);
        } else {
          shopify.toast.show("Error fetching products please refresh the page", {isError: true})
          setError(data.error);
        }
      }
      fetchProducts();
      setAlreadyLoaded(true);
    }
  }, [alreadyLoaded, shouldRerender]);

  const handleEdit = (productId: string, content: string) => {
  };

  const handleDelete = async (productId: string) => {
    const response = await fetch(`/api/deleteProduct`, {
      method: "POST",
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    if (data.success) {
      deleteProduct(productId);
      shopify.toast.show("Product deleted successfully", {isError: false});
    } else {
      shopify.toast.show("Error deleting product please refresh the page", {isError: true});
    }
  };



  const truncateText = (text: string, maxLength: number = 50) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  // make a loading state skeleton
  if (isLoading) {
    return (
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: '16px' }}>
              <Spinner size="large" />
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    );
  }
  const rows = products.map((product) => [
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Thumbnail
        source={product?.productThumbnail || ''}
        alt={product?.productTitle || ''}
        size="small"
      />
      <Text variant="bodyMd" as="span" fontWeight="bold">
        {product?.productTitle || 'Untitled Product'}
      </Text>
    </div>,
    <Text variant="bodyMd" as="span">
      {truncateText(product?.aiGeneratedProductContent)}
    </Text>,
    <div style={{ display: 'flex', gap: '8px' }}>
       <Button tone="critical" onClick={() => handleDelete(product.id)} icon={DeleteIcon} accessibilityLabel="Delete" />
       <Button onClick={() => handleEdit(product.id, product.aiGeneratedProductContent)} icon={EditIcon} accessibilityLabel="Edit" />
    </div>
  ]);

  return (
    <Layout>
      <Layout.Section>
        <Card>
          <div style={{ padding: '16px' }}>
            <Text variant="headingMd" as="h1">Products ({products.length})</Text>
          </div>
          <DataTable
            columnContentTypes={[
              'text',
              'text',
              'text',
            ]}
            headings={[
              'Product',
              'AI Generated Content',
              'Actions'
            ]}
            rows={rows}
            hoverable
          />
        </Card>
      </Layout.Section>
    </Layout>
  );
}

*/