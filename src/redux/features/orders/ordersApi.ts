import { argsType } from "../../../interfaces/interfaces";
import { baseApi } from "../../api/baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: argsType) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["orders"],
    }),
    getOrderById: builder.query({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["orders"],
    }),
    verifyPayment: builder.query({
      query: ({ order_id }) => ({
        url: `/orders/verify`,
        params: { order_id },
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useVerifyPaymentQuery,
} = ordersApi;
