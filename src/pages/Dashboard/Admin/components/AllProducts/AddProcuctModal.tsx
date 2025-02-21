import ProductForm from "./ProductForm";

export default function AddProductModal() {

  return (
<dialog id="add-product-modal" className="modal">
  <div className="modal-box">
  <ProductForm action="add" productId={null}/>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
  )
}
