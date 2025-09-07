export const getAppId = async (admin: any) => {
  try {
    const response = await admin.graphql(`
      query {
        currentAppInstallation {
          id
        }
      }
    `);
    if (response.ok) {
      const data = await response.json();
      console.log("the app id is this brother",data.data.currentAppInstallation.id)
      return data.data.currentAppInstallation.id
    }
  } catch (error) {
    console.log("error at getAppId", error);
  }
};
