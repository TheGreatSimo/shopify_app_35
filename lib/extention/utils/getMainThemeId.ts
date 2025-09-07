export const getMainThemeId = async (admin: any) => {
  try {
    const response = await admin.graphql(`
      {
        themes(first: 250) {
          edges {
            node {
              id
              role
            }
          }
        }
      }
      `);
    if (response.ok) {
      const data = await response.json();
      const themes = data.data.themes.edges;
      const theme = themes.filter((item: any) => item.node.role == "MAIN");
      const mainThemeId = theme[0].node.id;
      console.log("mainThemeId", mainThemeId)
      // get the last numbers gid://shopify/OnlineStoreTheme/153432162524
      const lastNumbers = mainThemeId.split("/").pop();
      return { success: false, id: mainThemeId, themeNumbers : lastNumbers };
    }
  } catch (error) {
    console.log("err at /utils/getmainthemeid ", error);
    return { success: false, id: null };
  }
    return { success: false, id: null };
};
