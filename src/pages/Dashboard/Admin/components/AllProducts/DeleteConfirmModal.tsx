
export default function DeleteConfirmModal({ productId, deleteProduct }: { productId: string | null; deleteProduct}) {

  return (
    <dialog id="delete-confirm-modal" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Are you sure to delete this bike?</h3>
    <p className="py-4">Click on the close button if you are not sure.</p>
    <div className="modal-action">
      <form className="flex gap-5" method="dialog">
        <button onClick={()=>deleteProduct(productId)} className="bg-red-500 px-3 py-1 text-white hover:bg-red-600">Confirm</button>          
        <button className=" px-3 py-1 bg-gray-300 hover:bg-gray-200">Close</button>
      </form>
    </div>
  </div>
</dialog>
  )
}
