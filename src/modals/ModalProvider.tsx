import { AddProductModal } from "./products/AddProductModal"
import { DeleteProduct } from "./products/DeleteProduct"
import { HelpModal } from "./products/HelpModal"
import { VariantSelector } from "./products/VariantSelector"

export const ModalProvider = () => {
  return (
    <>
      <AddProductModal />
      <DeleteProduct />
      <VariantSelector />
      <HelpModal />
    </>
  )
}
