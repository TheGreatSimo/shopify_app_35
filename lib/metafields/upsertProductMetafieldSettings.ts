interface RentSettings {
    isRentalEnabled: boolean;
    dailyPrice: number;
    minDays: number;
    maxDays: number;
}

export const upsertProductRentalSettingMetafield = async ({admin, appId, productId, rentSettings} : {admin: any, appId: string, productId: string, rentSettings: RentSettings}) => {
  try {
    const response = await admin.graphql(
      `
      mutation CreateAppDataMetafield($metafieldsSetInput: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafieldsSetInput) {
          metafields {
            id
            namespace
            key
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
              namespace: `rentable-${productId}`,
              key: "rentSettings",
              type: "json",
              value: JSON.stringify(rentSettings),
              ownerId: appId,
            },
          ],
        },
      },
    );
    console.log("the response is", response);
    if (response.ok) {
      const data = await response.json();
      if (data.data.metafieldsSet.userErrors != 0) {
        return { success: false, error: data.data.metafieldsSet.userErrors };
      } else {
        return { success: true, data: data.data.metafieldsSet.metafields };
      }
    }
  } catch (error) {
    console.log("the error is", error);
    return { success: false };
  }
  return { success: false };
};
