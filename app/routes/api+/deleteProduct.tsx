import { deleteProduct } from "lib/db/deleteProduct";
import { authenticate } from "../../shopify.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { deleteProductMetafield } from "lib/metafields/deleteProductMetafield";
import { getAppId } from "lib/app/getAppId";

export const action = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { admin } = await authenticate.admin(request);
    const formData = await request.formData();
    const productId = formData.get("productId") as string;
    console.log("The product id is this", productId);
    console.log("type of product id is", typeof(productId));
    const appId = await getAppId(admin);
    const { success: deleteProductSuccess, error: deleteProductError } = await deleteProduct({ productId });
    const { success: deleteSuccess, error: deleteError } = await deleteProductMetafield({
      admin,
      appId,
      productId,
    });
    return { success: deleteProductSuccess && deleteSuccess, error: deleteProductError || deleteError };
  } catch (error: any ) {
    console.log("Error in DeleteProduct", error);
    return {success: false};
  }
};
