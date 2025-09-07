export const getProductRentalSettingMetafield = async ({admin, appId, productId}: {admin: any, appId: String, productId: String}) => {
  try {
    const resonse = await admin.graphql(
      `
        query AppInstallationMetafields($ownerId: ID!) {
        appInstallation(id: $ownerId) {
          metafields(first: 250) {
            edges {
              node {
                namespace
                key
                value
              }
            }
          }
        }
      }`,
      {
        variables: {
          ownerId: appId
        },
      },
    );
    if (resonse.ok) {
      const data = await resonse.json();
      const productRentalSetting = data.data.appInstallation.metafields.edges.find((edge: any) => edge.node.namespace === `rentable-${productId}`);
      return { success: true, data: productRentalSetting };
    }
  } catch (error : any) {
    console.log("error at getSetting ts ", error?.message);
    return { success: false, error: error?.message };
  }
  return { success: false, error: "Error in getProductRentalSettingMetafield" };
};
