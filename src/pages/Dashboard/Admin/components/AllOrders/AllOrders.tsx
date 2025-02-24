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
  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [detailOrder, setDetailOrder] = useState<OrderType | null>(null);

  const { data: orders, error, isLoading } = useGetAllOrdersQuery(undefined);
  const loggedInUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (orders?.data) {
      setFilteredOrders(orders.data);
    }
  }, [orders]);

  const handleFilter = (status: string) => {
    setFilterStatus(status);
    if (status === "All Orders") {
      setFilteredOrders(orders?.data || []);
    } else {
      setFilteredOrders(
        orders?.data.filter((order: OrderType) => order.orderStatus.toLowerCase() === status.toLowerCase()) || []
      );
    }
  };

  const truncateOrderId = (orderId: string) => {
    if (orderId.length > 10) {
      return `${orderId.slice(0, 6)}...${orderId.slice(-4)}`;
    }
    return orderId;
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
    <div className="p-4 mb-5 bg-white rounded-lg shadow-md">
      <OrderDetails order={detailOrder} />
      <UpdateOrderStatus selectedOrder={selectedOrder} statusOptions={statusOptions} />

      {/* Status Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categoryOptions.map((category, i) => (
          <button
            key={i}
            onClick={() => handleFilter(category)}
            className={`border px-3 py-1 uppercase text-xs font-semibold rounded transition ${
              filterStatus === category
                ? "bg-green-600 border-green-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {loggedInUser?.role === "admin" && <th className="px-4 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order: OrderType) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{truncateOrderId(order._id)}</h4>
                    <span
                      className="text-lg hover:text-green-500 cursor-pointer"
                      onClick={() => {
                        setDetailOrder(order);
                        const modal = document.getElementById("order-details-modal") as HTMLDialogElement;
                        modal?.showModal();
                      }}
                    >
                      <FaRegEye />
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{order?.customer?.user_name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">${order.totalAmount}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold uppercase ${
                      order.orderStatus.toLowerCase() === "pending"
                        ? "bg-yellow-500"
                        : order.orderStatus.toLowerCase() === "processing"
                        ? "bg-blue-500"
                        : order.orderStatus.toLowerCase() === "shipped"
                        ? "bg-purple-500"
                        : order.orderStatus.toLowerCase() === "delivered"
                        ? "bg-green-500"
                        : order.orderStatus.toLowerCase() === "cancelled"
                        ? "bg-red-500"
                        : order.orderStatus.toLowerCase() === "returned" ? "bg-gray-500" : "bg-lime-500"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                {loggedInUser?.role === "admin" && (
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        const modal = document.getElementById("update-order-status-modal") as HTMLDialogElement;
                        modal?.showModal();
                      }}
                      className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
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

      {/* Mobile Table (Stacked Layout) */}
      <div className="lg:hidden space-y-4">
        {filteredOrders.map((order: OrderType) => (
          <div key={order._id} className="bg-gray-50 p-2 rounded-lg shadow-sm">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-700">{truncateOrderId(order._id)}</h4>
                <button
                  onClick={() => {
                    setDetailOrder(order);
                    const modal = document.getElementById("order-details-modal") as HTMLDialogElement;
                    modal?.showModal();
                  }}
                  className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Details
                </button>
              </div>
              <p className="text-sm text-gray-600">Customer:  {order?.customer?.user_name}</p>
              <p className="text-sm text-gray-600">Amount: ${order.totalAmount}</p>
              <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs uppercase ${
                      order.orderStatus.toLowerCase() === "pending"
                        ? "bg-yellow-500"
                        : order.orderStatus.toLowerCase() === "processing"
                        ? "bg-blue-500"
                        : order.orderStatus.toLowerCase() === "shipped"
                        ? "bg-purple-500"
                        : order.orderStatus.toLowerCase() === "delivered"
                        ? "bg-green-500"
                        : order.orderStatus.toLowerCase() === "cancelled"
                        ? "bg-red-500"
                        : order.orderStatus.toLowerCase() === "returned" ? "bg-gray-500" : "bg-lime-500"
                    }`}
                  >
                  {order.orderStatus}
                </span>
                {loggedInUser?.role === "admin" && (
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      const modal = document.getElementById("update-order-status-modal") as HTMLDialogElement;
                      modal?.showModal();
                    }}
                    className="px-3 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600"
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}