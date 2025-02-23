import { useForm } from "react-hook-form";
import { useUpdateOrderMutation } from "../../../../../redux/features/orders/ordersApi";
import toast from "react-hot-toast";

export default function UpdateOrderStatus({ selectedOrder, statusOptions }) {
  const { register, handleSubmit} = useForm({
    defaultValues: {
      orderStatus: selectedOrder?.orderStatus || "pending",
    },
  }); 
  
  const [updateOrder] = useUpdateOrderMutation();

  const currentStatus = selectedOrder?.orderStatus || "pending";

  const currentStatusIndex = statusOptions.indexOf(currentStatus);

  const allowedOptions = statusOptions.slice(currentStatusIndex);

  const onSubmit = async (data) => {

    try {
      const res = await updateOrder({ id: selectedOrder._id, data });
      toast.success("Order Status updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong.");
     }
    document.getElementById("update-order-status-modal")?.close()
  };

  return (
    <dialog id="update-order-status-modal" className="modal">
      <div className="modal-box">
        <h2 className="text-lg font-semibold mb-3">Update Order Status</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2 font-medium">Select Status:</label>
          <select
            {...register("orderStatus")}
            className="w-full border p-2 rounded-md focus:outline-none outline-none"
          >
            {allowedOptions.map((status, index) => (
              <option key={index} value={status} disabled={status === currentStatus}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3 mt-4 text-white">
            <button type="button" className=" px-4 py-1 bg-red-500 hover:bg-red-600 rounded-sm" onClick={() => document.getElementById("update-order-status-modal")?.close()}>
              Close
            </button>
            <button type="submit" className="px-4 py-1 bg-blue-500 hover:bg-blue-600 rounded-sm">
              Update
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
