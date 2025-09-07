import prisma from "app/db.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { admin, session } = await authenticate.admin(request);
    const { shop } = session;
    const products = await prisma.product.findMany({
      where: {
        shop,
      },
    });
    console.log("products", products);
    return { success: true, products : products };
  } catch (error) {
    console.log("Error in GetProducts", error);
    return { success: false, error: error };
  }
};