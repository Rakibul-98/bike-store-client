import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
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
    }),
    // updateProduct: builder.mutation({
    //   query: (productData) => ({
    //     url: `/products/${productData._id}`,
    //     method: "PATCH",
    //     body: productData,
    //   }),
    //   invalidatesTags: ["products"],
    // }),
    // deleteProduct: builder.mutation({
    //   query: (id: string) => ({
    //     url: `/products/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["products"],
    // }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByEmailQuery,
  // useUpdateProductMutation,
  // useDeleteProductMutation,
} = usersApi;
