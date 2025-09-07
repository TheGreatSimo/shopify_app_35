export const deleteProductMetafield = async ({admin, appId, productId} : { admin: any, appId: string, productId: string }) => {
  try {
    const response = await admin.graphql(
    `#graphql
      mutation MetafieldsDelete($metafields: [MetafieldIdentifierInput!]!) {
        metafieldsDelete(metafields: $metafields) {
          deletedMetafields {
            key
            namespace
            ownerId
          }
          userErrors {
            field
            message
          }
        }
    }`,
    {
      variables: {
        metafields: [
          {
            ownerId: appId,
            namespace: `rentable-${productId}`,
            key: "rentSettings",
          },
        ],
      },
    },
  );

  const data = await response.json();
  if (response.ok) {
    console.log("delete for the products was done successfully", data.data.metafieldsDelete.deletedMetafields);
    return {
      success: true,
      data: data.data.metafieldsDelete.deletedMetafields,
    };
  }
  return { success: false, error: "Metafields deleted successfully" };
  } catch (error: any) {
    console.log("Error in deleteProductMetafield", error);
    return { success: false, error: error };
  }
}
    

    

