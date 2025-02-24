import { useState, useEffect } from "react";
import { useGetAllOrdersQuery } from "../../../../../redux/features/orders/ordersApi";
import UpdateOrderStatus from "./UpdateOrderStatus";
import OrderDetails from "./OrderDetails";
import { FaRegEye } from "react-icons/fa6";
import { selectCurrentUser } from "../../../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../../../redux/features/hooks";
import { TableSkeleton } from "../../../shared/TableSkeleton";
import toast from "react-hot-toast";
import { OrderType } from "../../../../../interfaces/interfaces";

export default function AllOrders() {
  const [filterStatus, setFilterStatus] = useState("All Orders");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [detailOrder, setDetailOrder] = useState<OrderType | null>(null);

  const { data: orders, error, isLoading } = useGetAllOrdersQuery(undefined);

  const loggedInUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (orders?.data) {
      setFilteredOrders(orders.data);
    }
  }, [orders]);

  const handleFilter = (status:string) => {
    console.log(status);
    setFilterStatus(status);
    if (status === "All Orders") {
      setFilteredOrders(orders?.data || []);
    } else {
      setFilteredOrders(
        orders?.data.filter((order: { orderStatus: string }) => order.orderStatus.toLowerCase() === status.toLowerCase()) || []
      );
    }
  };

  const columns = [
    { key: "_id", label: "Order ID" },
    { key: "user_name", label: "Customer" },
    { key: "totalPrice", label: "Amount" },
    { key: "createdAt", label: "Date" },
    { key: "orderStatus", label: "Status" },
  ];

  const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled", "returned"];

  const categoryOptions = ["All Orders", ...statusOptions];

  if (isLoading) return <TableSkeleton />;
  if (error) return toast.error("Failed to load orders");

  return (
    <div>
      <OrderDetails order={detailOrder} />
      <UpdateOrderStatus selectedOrder={selectedOrder} statusOptions={statusOptions} />

      {/* Status Filter Buttons */}
      <div className="flex gap-4 mb-3">
        {categoryOptions.map((category, i) => (
          <button
            key={i}
            onClick={() => handleFilter(category)}
            className={`border px-3 py-1 uppercase text-sm font-semibold transition ${
              filterStatus === category ? "bg-green-600 border-green-600 text-white" : "hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <table className="table mb-5">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                <div className="inline-flex items-center gap-2">
                  <p>{column.label}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order:OrderType) => (
            <tr key={order._id}>
              <td>
                <div className="flex gap-3 items-center">
                  <h4 className="font-semibold">{order._id}</h4>
                  <span
                    className="text-lg hover:text-green-500 cursor-pointer"
                    onClick={() => {
                      setDetailOrder(order);
                      const modal = document.getElementById('order-details-modal') as HTMLDialogElement;
                      modal?.showModal();
                    }}
                  >
                    <FaRegEye />
                  </span>
                </div>
              </td>
              <td>{order?.customer?.user_name}</td>
              <td>${order.totalAmount}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-white text-[10px] font-semibold uppercase ${
                    order?.orderStatus.toLowerCase() === "pending"
                      ? "bg-yellow-500"
                      : order.orderStatus.toLowerCase() === "processing"
                      ? "bg-blue-500"
                      : order.orderStatus.toLowerCase() === "paid"
                      ? "bg-lime-500"
                      : order.orderStatus.toLowerCase() === "shipped"
                      ? "bg-purple-500"
                      : order.orderStatus.toLowerCase() === "delivered"
                      ? "bg-green-500"
                      : order.orderStatus.toLowerCase() === "cancelled"
                      ? "bg-red-500"
                      : order.orderStatus.toLowerCase() === "returned"
                      ? "bg-gray-500"
                      : "bg-gray-300"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </td>
              {loggedInUser?.role === "admin" && (
                <td>
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      const modal = document.getElementById('update-order-status-modal') as HTMLDialogElement;
            modal?.showModal();
                    }}
                    className="btn text-white hover:text-black btn-ghost btn-xs bg-purple-500"
                  >
                    Update
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}