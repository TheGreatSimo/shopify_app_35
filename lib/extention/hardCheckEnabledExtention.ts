import { getMainThemeId } from "./utils/getMainThemeId";
import { checkExtensionActivation } from "./utils/readAndCheckExtentionOnTheme";

interface HardCheckEnabledExtentionType {
  admin: any;
  themeId : string
}

export const hardCheckEnabledExtention = async ({
  admin,
  themeId,
}: HardCheckEnabledExtentionType) => {
  const blockType = "shopify://apps/easy-rentals/blocks/1/71867296-89e3-41bd-a1ab-4bd70b39ff71"
  const { id } = await getMainThemeId(admin);
  const { success, result } = await checkExtensionActivation({ admin, id, blockType }) || { success: false, result: false };
  return { themeHasExtention: result };
};
