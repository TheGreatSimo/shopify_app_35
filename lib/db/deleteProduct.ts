import prisma from "app/db.server";

export const deleteProduct = async ({productId}: {productId: string}) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return { success: true, data: deletedProduct };
  } catch (error: any) {
    console.log("error in deleteProduct prisma function", error?.message);
    return { success: false, error: error };
  }
}
