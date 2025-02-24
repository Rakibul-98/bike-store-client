import { argsType } from "../../../interfaces/interfaces";
import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: argsType) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
    }),
    getUserByEmail: builder.query({
      query: (email: string) => ({
        url: `/users/${email}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByEmailQuery,
  useBlockUserMutation,
  useUpdateUserMutation,
} = usersApi;
