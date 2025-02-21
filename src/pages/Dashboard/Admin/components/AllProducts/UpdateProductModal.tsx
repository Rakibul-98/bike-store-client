// import ProductForm from "./AllProducts/ProductForm";

import ProductForm from "./ProductForm";

export default function UpdateProductModal({ productId }: { productId: string | null }) {
  return (
    <dialog id="update-product-modal" className="modal">
      <div className="modal-box">
      <ProductForm productId={productId} action="update"/>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}
