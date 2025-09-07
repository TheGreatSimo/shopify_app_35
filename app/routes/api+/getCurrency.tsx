import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { admin } = await authenticate.admin(request);
    const response = await admin.graphql(
    `#graphql
      query {
        shop {
          currencyCode
        }
      }`,
    );
  const data = await response.json();
  return {currencyCode: data.data.shop.currencyCode};
    
  } catch (error) {
    return {error: error, currencyCode: "USD"};
  }
};
