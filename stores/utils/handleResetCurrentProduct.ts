import { useCurrentProductStore } from "../currentProduct";

export const handleResetCurrentProduct = () => {
  useCurrentProductStore.getState().reset();
};