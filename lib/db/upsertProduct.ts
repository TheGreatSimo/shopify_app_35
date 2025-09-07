import prisma from "app/db.server";

export const upsertProduct = async ({productId, title, thumbnail, minDays, maxDays, dailyPrice, shop, shopifyProductId, isRentalEnabled, sessionId, rentVariantId}: {productId: string, title: string, thumbnail: string, minDays: number, maxDays: number, dailyPrice: number, shop: string, shopifyProductId: string, isRentalEnabled: boolean, sessionId: string, rentVariantId: string}) => {
  try {
    const newProduct = await prisma.product.upsert({
      where: {
        id: productId,
      },
      update: {
        title,
        thumbnail,
        minDays,
        maxDays,
        dailyPrice,
        shop,
        shopifyProductId,
        isRentalEnabled,
        sessionId,
        rentVariantId,
        hasRentalVariant: true,
      },
      create: {
        id: productId,
        title,
        thumbnail,
        minDays,
        maxDays,
        dailyPrice,
        shop,
        shopifyProductId,
        isRentalEnabled,
        sessionId,
        rentVariantId,
        hasRentalVariant: true,
      },
    });
    return { success: true, data: newProduct };
  } catch (error) {
    console.log(error);
    return { success: false, error: error };
  }
}
