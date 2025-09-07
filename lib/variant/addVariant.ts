export const addVariant = async ({
  admin,
  appId,
  productId,
  options,
  dailyPrice,
}: {
  admin: any;
  appId: string;
  productId: string;
  options: any;
  dailyPrice: number;
}): Promise<{ success: boolean; rentVariantId: string }> => {
  try {
    const response = await admin.graphql(
      `#graphql
        mutation ProductVariantsCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
          productVariantsBulkCreate(productId: $productId, variants: $variants) {
            productVariants {
              id
              title
              inventoryItem{
                inventoryPolicy {
                  CONTINUE
                }
              }
              selectedOptions {
                name
                value
              }
            }
            userErrors {
              field
              message
            }
          }
        }`,
      {
        variables: {
          productId: productId,
          variants: [
            {
              price: dailyPrice,
              optionValues: [
                {
                  name: "Rental",
                  optionId: options[0].optionId,
                }
              ],
            },
          ],
        },
      },
    );

    const data = await response.json();
    console.log("the data is", data.data);
    if (data.data.productVariantsBulkCreate.userErrors.length > 0) {
      console.log("the user errors are", data.data.productVariantsBulkCreate.userErrors);
      return { success: false, rentVariantId: "" };
    }
    return {
      success: true,
      rentVariantId: data.data.productVariantsBulkCreate.productVariants[0].id,
    };
  } catch (error) {
    console.log("Error in addVariant", error);
    return { success: false, rentVariantId: "" };
  }
};
