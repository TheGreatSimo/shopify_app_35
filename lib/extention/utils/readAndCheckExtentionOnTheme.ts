interface readAndCheckExtentionOnThemeType {
  admin: any;
  id: string;
  blockType: any;
}

export const checkExtensionActivation = async ({
  admin,
  id,
  blockType,
}: readAndCheckExtentionOnThemeType) => {
  try {
    const response = await admin.graphql(
      `
      query($id: ID!) {
        theme(id: $id) {
          id
          prefix
          processing
          files(filenames: "templates/product.json") {
            edges {
              node {
                filename
                contentType
                size
                body {
                  ... on OnlineStoreThemeFileBodyText {
                    __typename
                    content
                  }
                }
              }
            }
          }
        }
      }
      `,
      {
        variables: {
          id,
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      const content = data.data.theme.files.edges[0].node.body.content;

      const cleanContent = cleanJSON(content);

      const fileDataJson = JSON.parse(cleanContent);

      // Check all sections for the block type
      const sections = fileDataJson.sections || {};
      let foundActiveBlock = false;

      for (const sectionKey in sections) {
        const section = sections[sectionKey];
        if (section.blocks) {
          foundActiveBlock = Object.values(section.blocks).some(
            (block: any) => block.type === blockType && block.disabled !== true,
          );
          if (foundActiveBlock) break;
        }
      }

      return { success: true, result: foundActiveBlock };
    }
  } catch (error: any) {
    console.log(
      "Error at services/extention/utils/checkExtensionActivation",
      error.message,
    );
    return { success: false, result: null };
  }
  return { success: false, result: null };
};

// Function to clean out comments and non-JSON parts
const cleanJSON = (content: any) => {
  // Remove anything before the actual JSON, including comments
  const jsonStartIndex = content.indexOf("{");
  const jsonEndIndex = content.lastIndexOf("}") + 1;
  const jsonString = content.slice(jsonStartIndex, jsonEndIndex);

  // Optional: You can add more cleaning rules if needed, like removing specific comments or formatting issues.
  return jsonString;
};
