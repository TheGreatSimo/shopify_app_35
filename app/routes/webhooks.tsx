import { authenticate } from "../shopify.server";

export const action = async ({ request }: { request: Request }) => {
  const { topic, shop, session, admin } = await authenticate.webhook(request);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  // The topics handled here should be declared in the shopify.app.toml.
  // More info: https://shopify.dev/docs/apps/build/cli-for-apps/app-configuration
  switch (topic) {
    case "APP_UNINSTALLED":
      return new Response("Success", { status: 200 });

    case "CUSTOMERS_DATA_REQUEST":
      return new Response("Success", { status: 200 });
    case "CUSTOMERS_REDACT":
      return new Response("Success", { status: 200 });
    case "SHOP_REDACT":
      return new Response("Success", { status: 200 });
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
