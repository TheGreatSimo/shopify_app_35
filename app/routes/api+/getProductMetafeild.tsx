import { authenticate } from "app/shopify.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getAppId } from "lib/app/getAppId";
import { getProductRentalSettingMetafield } from "lib/metafields/getProductRentalSettingMetafield";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const appId = await getAppId(admin);
  const productId = 'gid://shopify/Product/15385253609545'
  console.log("we got the fetch request")
  try {
    const { success, data, error } = await getProductRentalSettingMetafield({
      admin,
      appId,
      productId,
    });
    console.log("the data are", data);
    console.log("the success is", success);
    console.log("the error is", error);
    return { success, data, error };
  } catch (error: any) {
    console.log("Error in getProductMetafeild", error?.message);
    return { success: false, data: null, error: error?.message };
  }
  return { success: false, data: null, error: "Error in getProductMetafeild" };
};