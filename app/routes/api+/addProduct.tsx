import { authenticate } from "../../shopify.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { upsertProduct } from "lib/db/upsertProduct";
import { upsertProductRentalSettingMetafield } from "lib/metafields/upsertProductMetafieldSettings";
import { getAppId } from "lib/app/getAppId";
import { addVariant } from "lib/variant/addVariant"; 

export const action = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { admin, session } = await authenticate.admin(request);
    const { shop } = session;
    const appId = await getAppId(admin);
    const formData = await request.formData();
    const isRentalEnabled = formData.get("isRentalEnabled") as string;
    const productId = formData.get("productId") as string;
    const productThumbnail = formData.get("productThumbnail") as string;
    const productTitle = formData.get("productTitle") as string;
    const productDailyPrice = formData.get("productDailyPrice") as string;
    const productMinDays = formData.get("productMinDays") as string;
    const productMaxDays = formData.get("productMaxDays") as string;
    const optionsString = formData.get("options") as string;
    const hasRentalVariant = formData.get("hasRentalVariant") as string;
    const existingRentVariantId = formData.get("rentVariantId") as string;
    const options = JSON.parse(optionsString);

    let rentVariantId = existingRentVariantId;

    if (!existingRentVariantId) {
      const { success: addVariantSuccess, rentVariantId: newVariantId } = await addVariant({admin, appId, productId, options, dailyPrice: parseInt(productDailyPrice)});
      if (!addVariantSuccess) {
        return { success: false, errorMessage: "Failed to add variant. Please try again" };
      }
      rentVariantId = newVariantId;
    }

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
      rentVariantId,
    });

    const rentSettings = {
      isRentalEnabled: isRentalEnabled === "true",
      dailyPrice: parseInt(productDailyPrice),
      minDays: parseInt(productMinDays),
      maxDays: parseInt(productMaxDays),
      rentVariantId
    };
    const { success: upsertSuccess, error: upsertError } = await upsertProductRentalSettingMetafield({
      admin,
      appId,
      productId,
      rentSettings,
    });
    return {success : success && upsertSuccess, error: error || upsertError };
  } catch (error) {
    console.log("Error in AddProducts", error);
    return { success: false };
  }
};
