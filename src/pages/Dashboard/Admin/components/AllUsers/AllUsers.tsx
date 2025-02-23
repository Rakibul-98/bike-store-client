import { useBlockUserMutation, useGetAllUsersQuery } from "../../../../../redux/features/users/usersApi";
import { TableSkeleton } from "../../../shared/TableSkeleton";
// import { useState } from "react";

export default function AllUsers() {
  // const [filterStatus, setFilterStatus] = useState("All Orders");
  // const [filteredOrders, setFilteredOrders] = useState([]);
  // const [selectedUser, setSelectedUser] = useState(null);
  // const [detailOrder, setDetailOrder] = useState(null);
  const { data: users, error, isLoading } = useGetAllUsersQuery(undefined);

  const [blockUser] = useBlockUserMutation();

  // useEffect(() => {
  //   if (orders?.data) {
  //     setFilteredOrders(orders.data);
  //   }
  // }, [orders]);

  // const handleFilter = (status) => {
  //   setFilterStatus(status);
  //   if (status === "All Orders") {
  //     setFilteredOrders(orders?.data || []);
  //   } else {
  //     setFilteredOrders(orders?.data.filter((order) => order.orderStatus === status) || []);
  //   }
  // };

  const columns = [
    { key: "user_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "createdAt", label: "Member since" },
    { key: "isBlocked", label: "Status" },
  ];

  // const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled", "returned"];

  // const categoryOptions = ["All Orders", ...statusOptions];

  if (isLoading) return <TableSkeleton/>;
  if (error) return <p>Failed to load orders.</p>;

  const handleBlockUser = (userId) => { 
    blockUser(userId);
  }

  return (
    <div>
      <h3>All Users</h3>

      {/* Orders Table */}
      <table className="table">
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
          {users?.data?.map((user) => (
            <tr key={user._id}>
              <td>
                <div className="flex gap-3 items-center">
                  <h4 className="font-semibold">{user.user_name || user.name}</h4>
                </div>
              </td>
              <td>{user?.email}</td>
              <td>{new Date(user?.createdAt).toLocaleString()}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-white text-[10px] font-semibold uppercase ${
                    user?.isBlocked
                      ? "bg-red-500"
                      :  "bg-green-500"
                  }`}
                >
                  {user?.isBlocked? "Blocked" : "Active"}
                </span>
              </td>
              <td>
                <button
                  disabled={user?.isBlocked}
                  onClick={() => {
                    handleBlockUser(user?._id);
                  }}
                  className="btn text-white hover:text-black btn-ghost btn-xs bg-purple-500"
                >
                  Block
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
