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
  ];

  if (isLoading) return <TableSkeleton/>;
  if (error) return toast.error("Error loading users!!");

  const handleBlockUser = (userId: string) => { 
    blockUser(userId);
  }

  return (
    <div>
      <h3>All Users</h3>

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
          {users?.data?.map((user:UserType) => (
            <tr key={user._id}>
              <td>
                <div className="flex gap-3 items-center">
                  <h4 className="font-semibold">{ user?.user_name}</h4>
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
                  {user?.isBlocked ? "Blocked" : "Active"}
                </span>
              </td>
              <td>
                <button
                  disabled={user?.isBlocked || user?.role === "admin" }
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
