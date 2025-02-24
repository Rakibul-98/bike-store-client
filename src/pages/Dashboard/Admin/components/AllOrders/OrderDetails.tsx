import toast from "react-hot-toast";
import { useDeleteOrderMutation } from "../../../../../redux/features/orders/ordersApi";

export default function OrderDetails({ order }) {

  const [deleteOrder] = useDeleteOrderMutation();

  const statusColors = {
    pending: "bg-yellow-500",
    paid: "bg-lime-500",
    processing: "bg-blue-500",
    shipped: "bg-purple-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
    returned: "bg-gray-500",
  };

  const orderSteps = [
    { step: "pending", deliveryTime: "Make payment to complete the order" },
    { step: "processing", deliveryTime: "17 days" },
    { step: "shipped", deliveryTime: "14 days" },
    { step: "delivered", deliveryTime: "Order already has been delivered" },
  ];

  // Map the order status to the timeline steps
  const getTimelineStep = (orderStatus) => {
    const status = orderStatus?.toLowerCase(); // Convert to lowercase for better comparison
    if (status === "pending") return "pending";
    if (status === "paid" || status === "processing") return "processing";
    if (status === "shipped") return "shipped";
    if (status === "delivered") return "delivered";
    return "delivered"; // For cancelled and returned, show up to delivered
  };

  const timelineStep = getTimelineStep(order?.orderStatus);
  const currentStepIndex = orderSteps.findIndex((step) => step.step === timelineStep);

  const estimatedDeliveryTime = orderSteps[currentStepIndex]?.deliveryTime || "Estimated delivery: Unknown";

  const handleDelete = (orderId) => {
    deleteOrder(orderId);
    document.getElementById("order-details-modal")?.close();
    toast.success("Items deleted successfully");
  };

  return (
    <dialog id="order-details-modal" className="modal">
      <div className="modal-box">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Order Details</h2>
          <p
            className={`mt-2 px-3 py-1 rounded-full text-white text-sm font-semibold w-fit ${statusColors[order?.orderStatus.toLowerCase()]}`}
          >
            {order?.orderStatus.toUpperCase()}
          </p>
        </div>

        {/* Timeline Section */}
        <ul className="timeline timeline-horizontal justify-center mt-3 mb-10">
          {orderSteps.map((stepData, index) => (
            <li className="h-10" key={stepData.step}>
              {index > 0 && <hr />}
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-5 w-5 ${
                    index <= currentStepIndex ? "text-green-500" : "text-gray-300"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div
                className={`timeline-end px-2 py-1 uppercase text-xs bg-gray-100`}
              >
                {stepData.step}
              </div>

              {index < orderSteps.length - 1 && <hr />}
            </li>
          ))}
        </ul>

        {/* Order Details */}
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Order ID:</span> {order?._id}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Customer:</span> {order?.customer?.user_name} (
          {order?.customer?.email})
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Date:</span>{" "}
          {new Date(order?.createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Estimate Delivery Time:</span> {estimatedDeliveryTime}
        </p>

        <h3 className="mt-3 font-semibold">Order Items:</h3>
        <ul className="border p-2 rounded-md">
          {order?.items?.map((item, index) => (
            <li key={index} className="flex justify-between border-b py-1 text-sm">
              <span>
                {item?.product?.name} - Qty: {item?.order_quantity}
              </span>
              <span>${item?.product?.price}</span>
            </li>
          ))}
        </ul>

        <p className="text-lg font-semibold mt-3">Total Price: ${order?.totalAmount}</p>

        <div className="modal-action flex justify-end">
          { order?.customer?.role === 'customer' && order?.orderStatus === "pending" &&
            <button
            className="hover:bg-gray-200 hover:text-black cursor-pointer bg-red-500 px-3 py-1 rounded-sm text-white me-auto"
            onClick={() => handleDelete(order._id)}
          >
            Delete
          </button>
        }
          <button
            className="bg-gray-400 cursor-pointer hover:bg-red-500 px-3 py-1 rounded-sm text-white"
            onClick={() => document.getElementById("order-details-modal")?.close()}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}