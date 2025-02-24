import toast from "react-hot-toast";
import { useBlockUserMutation, useGetAllUsersQuery } from "../../../../../redux/features/users/usersApi";
import { TableSkeleton } from "../../../shared/TableSkeleton";
import { UserType } from "../../../../../interfaces/interfaces";

export default function AllUsers() {
  const { data: users, error, isLoading } = useGetAllUsersQuery(undefined);
  const [blockUser] = useBlockUserMutation();

  const columns = [
    { key: "user_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "createdAt", label: "Member since" },
    { key: "isBlocked", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  if (isLoading) return <TableSkeleton />;
  if (error) return toast.error("Error loading users!!");

  const handleBlockUser = (userId: string) => {
    blockUser(userId)
      .unwrap()
      .then(() => toast.success("User blocked successfully!"))
      .catch(() => toast.error("Failed to block user!"));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6">All Users</h3>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.data?.map((user: UserType) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-700">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{user?.user_name}</h4>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{user?.email}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {new Date(user?.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold uppercase ${
                      user?.isBlocked ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {user?.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    disabled={user?.isBlocked || user?.role === "admin"}
                    onClick={() => handleBlockUser(user?._id)}
                    className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Table (Stacked Layout) */}
      <div className="md:hidden space-y-4">
        {users?.data?.map((user: UserType) => (
          <div key={user._id} className="bg-gray-50 p-2 rounded-lg shadow-sm">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-700">{user?.user_name}</h4>
                <span
                  className={`px-2 py-[1px] rounded-full text-white text-xs uppercase ${
                    user?.isBlocked ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {user?.isBlocked ? "Blocked" : "Active"}
                </span>
              </div>
              <p className="text-xs text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-600">
                Member since: {new Date(user?.createdAt).toLocaleString()}
              </p>
              <button
                disabled={user?.isBlocked || user?.role === "admin"}
                onClick={() => handleBlockUser(user?._id)}
                className="w-full px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Block
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}