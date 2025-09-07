import { Button, Card, Layout, Page } from "@shopify/polaris";
import { CardOne } from "../../src/cards/CardOne";
import { authenticate } from "../shopify.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useStoreCurrencyStore } from "stores/storeCurrency";
import { RentalProductsTable } from "src/components/RentalProductsTable";
import { hardCheckEnabledExtention } from "lib/extention/hardCheckEnabledExtention";
import { getMainThemeId } from "lib/extention/utils/getMainThemeId";  
import { ActivateExtentionCard } from "src/cards/ActivateExtentionCard";
import { getDeepLink } from "lib/deepLink/getDeepLink";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  try {
    const { id } = await getMainThemeId(admin);
    const { themeHasExtention } = await hardCheckEnabledExtention({ admin, themeId: id });
    const deepLink = await getDeepLink({ session });
    console.log("the theme has extention is this", themeHasExtention);
    return { themeHasExtention, deepLink };
  } catch (error) {
    return { themeHasExtention: false, deepLink: "" };
  }
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  console.log("the action worked just fine");
  return null;
}


export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  let themeHasExtention = loaderData?.themeHasExtention || false;
  let deepLink = loaderData?.deepLink || "";
  useEffect(() => {
    fetch("/api/getCurrency")
    .then(res => res.json())
    .then(data => {
      useStoreCurrencyStore.setState({ currencyCode: data.currencyCode });    
    })
  }, [])
  const handletestaction = async () => {
  }
  const testgetproducts = async () => {
    const response = await fetch("/api/getProducts");
    const data = await response.json();
    console.log("Data", data);
  }
  const handleGetProductMetafeild = async () => {
    const response = await fetch("/api/getProductMetafeild");
    const data = await response.json();
    console.log("Data", data);
  }
  return (
    <Page secondaryActions={ <Button onClick={() => shopify.modal.show("HelpModal")}>Need help?</Button>}>
      <Layout>
        <Layout.Section>
          {themeHasExtention === false && <ActivateExtentionCard deepLink={deepLink} /> }
        </Layout.Section>
        <Layout.Section>
          <CardOne />
        </Layout.Section>
        {/* 
        <Layout.Section>
          <Button onClick={() => shopify.modal.show("AddProductModal")}>Add Product</Button>
          <Button onClick={testgetproducts}>Test Get Products</Button>
          <Button onClick={() => shopify.modal.show("DeleteProduct")}>Delete Product</Button>
          <Button onClick={handleGetProductMetafeild}>Get Product Metafeild</Button>
        </Layout.Section>
        */}
        <Layout.Section>
          <RentalProductsTable/>
        </Layout.Section>
      </Layout>
    </Page>
  )
}
