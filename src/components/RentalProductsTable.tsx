import { Card, Layout, Thumbnail, DataTable, Button, Text, Spinner } from "@shopify/polaris";
import { DeleteIcon, EditIcon } from '@shopify/polaris-icons';
import { useEffect, useState } from "react";
import { useProductsTableDataStore } from "stores/productsTableData";
import { useDeleteProductStore } from "stores/deleteProductStore";
import { useCurrentProductStore } from "stores/currentProduct";

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
  hasRentalVariant: boolean;
  rentVariantId: string;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
}


export const RentalProductsTable = () => {

  const { setProductTitle, setProductId, setProductThumbnail, setProductDailyPrice, setRentalEnabled, setActionType, setProductMinDays, setProductMaxDays, setHasRentalVariant, setSelectedVariantId } = useCurrentProductStore();
  const { setDeleteProductId } = useDeleteProductStore();
  const { products, setProducts, updateProduct } = useProductsTableDataStore();
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!alreadyLoaded) {
      const fetchProducts = async () => {
        setIsLoading(true);
        const response = await fetch("/api/getProducts");
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
          console.log("from rentable table the products", data.products);
          setIsLoading(false);
        } else {
          shopify.toast.show("Error fetching products, please refresh the page", {isError: true});
          setError(data.error);
        }
      };
      fetchProducts();
      setAlreadyLoaded(true);
    }
  }, [alreadyLoaded]);

  const handleEdit = (product: Product) => {
    setActionType('update');
    setProductDailyPrice(product.dailyPrice)
    setProductTitle(product.title)
    setProductId(product.id)
    setProductThumbnail(product.thumbnail)
    setRentalEnabled(product.isRentalEnabled)
    setProductMinDays(product.minDays)
    setProductMaxDays(product.maxDays)
    setHasRentalVariant(product.hasRentalVariant)
    setSelectedVariantId(product.rentVariantId)
    shopify.modal.show("AddProductModal");
    updateProduct(product);
  };

  const handleDelete = async (productId: string) => {
    setDeleteProductId(productId);
    shopify.modal.show("DeleteProduct");
    
  };

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
        source={product.thumbnail || ''}
        alt={product.title || ''}
        size="small"
      />
      <Text variant="bodyMd" as="span" fontWeight="bold">
        {product.title || 'Untitled Product'}
      </Text>
    </div>,
    <Text variant="bodyMd" as="span">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ 
          padding: '2px 8px',
          borderRadius: '12px',
          backgroundColor: product.isRentalEnabled ? '#AEE9D1' : '#FED3D1',
          color: product.isRentalEnabled ? '#005E46' : '#D72C0D'
        }}>
          {product.isRentalEnabled ? 'Enabled' : 'Disabled'}
        </span>
      </div>
    </Text>,
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button tone="critical" onClick={() => handleDelete(product.id)} icon={DeleteIcon} accessibilityLabel="Delete" />
      <Button onClick={() => handleEdit(product as Product)} icon={EditIcon} accessibilityLabel="Edit" />
    </div>
  ]);

  return (
    <Layout>
      <Layout.Section>
        <Card>
          <div style={{ padding: '16px' }}>
            <Text variant="headingMd" as="h1">Rental Products ({products.length})</Text>
          </div>
          <DataTable
            columnContentTypes={[
              'text',
              'text',
              'text',
            ]}
            headings={[
              'Product',
              'Rental Status',
              'Actions'
            ]}
            rows={rows}
            hoverable
          />
        </Card>
      </Layout.Section>
    </Layout>
  );
}; 