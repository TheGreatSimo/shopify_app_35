interface RentSettings {
    isRentalEnabled: boolean;
    dailyPrice: number;
    minDays: number;
    maxDays: number;
}

export const upsertProductMetafield = async ({admin, productId, rentSettings} : {admin: any, productId: string, rentSettings: RentSettings}) => {
  try {
        const response = await admin.graphql(
      `
      
      mutation CreateProductMetafield($metafieldsSetInput: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafieldsSetInput) {
          metafields {
            id
            namespace
            key
            value
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
      {
        variables: {
          metafieldsSetInput: [
            {
              namespace: "rentable",
              key: `rentSettings`,
              type: "json",
              value: JSON.stringify(rentSettings),
              ownerId: productId,
            },
          ],
        },
      },
    );
    
    console.log("the response is", response);
    if (response.ok) {
      const data = await response.json();
      if (data.data.metafieldsSet.userErrors.length > 0) {
        console.log("the error is", data.data.metafieldsSet.userErrors);
        return { success: false, error: data.data.metafieldsSet.userErrors };
      } else {
        console.log("upsert for the products was done successfully", data.data.metafieldsSet.metafields);
        return { success: true, data: data.data.metafieldsSet.metafields };
      }
    }
    return { success: false, error: "Metafields upserted successfully" };
  } catch (error) {
    console.log("Error in upsertProductMetafield", error);
    return { success: false, error: error };
  }


}
