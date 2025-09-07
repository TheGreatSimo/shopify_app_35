export async function getDeepLink({ session } : { session : any })  {
  const shopDomain = session.shop 
  console.log("tshop domain", session.shop)
  const api_key = '6ed39bfccddf90e4979da77b1e143434'
  const handle = '1'

//https://appsimo35.myshopify.com/admin/themes/184397889609/editor?template=product&addAppBlockId=6ed39bfccddf90e4979da77b1e143434/1/&target=mainSection
  const deeplink = `https://${shopDomain}/admin/themes/current/editor?template=product&addAppBlockId=${api_key}/${handle}&target=mainSection`
  const test = 'https://appsimo35.myshopify.com/admin.shopify.com/store/appsimo35/themes/184397889609/editor?context=apps&template=product&activateAppId=6ed39bfccddf90e4979da77b1e143434/1/&target=mainSection'

  const test2 = 'https://admin.shopify.com/store/appsimo35/themes/184397889609/editor?template=product&activateAppId=6ed39bfccddf90e4979da77b1e143434/1/&target=mainSection'
  return deeplink 
}
