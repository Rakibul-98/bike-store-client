import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit3, FiSave } from "react-icons/fi";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetUserByEmailQuery, useUpdateUserMutation } from "../../redux/features/users/usersApi";
import toast from "react-hot-toast";
import ChangePassword from "./ChangePassword";
import { UserProfileSkeleton } from "./UserProfileSkeleton";
import { APIErrorType } from "../../interfaces/interfaces";

interface FormData {
  user_name: string;
  profile_image: string;
}

export default function UserProfile() {
  const loggedInUser = useAppSelector(selectCurrentUser);

  const { data: user, error, isLoading } = useGetUserByEmailQuery(loggedInUser?.user || "", {
    skip: !loggedInUser?.user,
  });

  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
    user_name: false,
    profile_image: false,
  });

  const [updateUser] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (user?.data) {
      reset({
        user_name: user.data.user_name || "",
        profile_image: user.data.profile_image || "https://via.placeholder.com/150",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await updateUser({ userId: user.data._id, data }).unwrap();

      if (res?.success) {
        toast.success("Profile updated successfully!");
        setIsEditing({ user_name: false, profile_image: false });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error: unknown) {
        const errorMessage =
        (error as APIErrorType)?.data?.message || "Something went wrong!!";
      toast.error(errorMessage);
    }
  };

  if (isLoading) return <UserProfileSkeleton />;
  if (error) return <p>Failed to load user.</p>;

  return (
    <div className="my-10 min-h-[80vh] flex items-center justify-center">
      <div className="sm:w-96 shadow-lg rounded-xl p-6 text-center border bg-gray-50">
        <div className="relative mx-auto w-24 h-24">
          <img
            src={user.data.profile_image || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-full h-full rounded-full border-4 border-green-500"
          />

          <button
            className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full"
            onClick={() =>
              setIsEditing({ ...isEditing, profile_image: !isEditing.profile_image })
            }
          >
            <FiEdit3 />
          </button>
        </div>

        {isEditing.profile_image && (
          <div className="mt-3">
            <input
              type="text"
              {...register("profile_image", { required: "Profile image URL is required" })}
              className={`${errors.user_name && "border-red-500"} w-full px-3 py-2 border rounded-md outline-none `}
              placeholder="Enter image URL"
            />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div className="flex justify-between gap-2 items-center py-2 rounded-lg">
            {isEditing.user_name ? (
              <input
                type="text"
                {...register("user_name", { required: "User name is required" })}
                className={`${errors.user_name && "border-red-500"} w-full px-3 py-2 border rounded-md outline-none`}
                placeholder="Enter user name"
              />
            ) : (
              <span className="w-full font-bold">{user.data.user_name}</span>
            )}
            <button
              onClick={() =>
                setIsEditing({ ...isEditing, user_name: !isEditing.user_name })
              }
              type="button"
            >
              <FiEdit3 className="text-gray-500" />
            </button>
          </div>

          <div className="text-left space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong> {user.data.email}
            </p>
            <p>
              <strong>Role:</strong> {user.data.role}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {user?.data?.isBlocked ? (
                <span className="text-red-500">Blocked</span>
                
              ) : (
                <span className="text-green-500">Active</span>
              )}
            </p>
            <p>
              <strong>Joined On:</strong> {new Date(user.data.createdAt).toDateString()}
            </p>
          </div>

          {/* Save Button */}
          {(isEditing.user_name || isEditing.profile_image) && (
            <button
              type="submit"
              className="bg-purple-600 text-white w-full py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700"
            >
              <FiSave />
              Save Changes
            </button>
          )}
        </form>
        <ChangePassword />
      </div>
    </div>
  );
}