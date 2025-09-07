import { authenticate } from "../../shopify.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { upsertProduct } from "lib/db/upsertProduct";

export const action = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { admin, session } = await authenticate.admin(request);
    const { shop } = session;
    const formData = await request.formData();
    const isRentalEnabled = formData.get("isRentalEnabled") as string;
    const productId = formData.get("productId") as string;
    const productThumbnail = formData.get("productThumbnail") as string;
    const productTitle = formData.get("productTitle") as string;
    const productDailyPrice = formData.get("productDailyPrice") as string;
    const productMinDays = formData.get("productMinDays") as string;
    const productMaxDays = formData.get("productMaxDays") as string;

    console.log("the isRentalEnabled is ", isRentalEnabled);
    console.log("the productId is ", productId);
    console.log("the productThumbnail is ", productThumbnail);
    console.log("the productTitle is ", productTitle);
    console.log("the productDailyPrice is ", productDailyPrice);
    console.log("the productMinDays is ", productMinDays);
    console.log("the productMaxDays is ", productMaxDays);
    const { success, data, error } = await upsertProduct({
      productId,
      title: productTitle,
      thumbnail: productThumbnail,
      minDays: parseInt(productMinDays),
      maxDays: parseInt(productMaxDays),
      dailyPrice: parseInt(productDailyPrice),
      shop,
      shopifyProductId: productId,
      isRentalEnabled: isRentalEnabled === "true",
      sessionId: session.id,
    });
    return {success }
  } catch (error) {
    console.log("Error in AddProducts", error);
    return { success: false };
  }
};
