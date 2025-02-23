import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    changePassword: builder.mutation({
      query: (newData) => ({
        url: "/auth/changePassword",
        method: "PUT",
        body: newData,
      }),
    }),
    registration: builder.mutation({
      query: (userData) => ({
        url: "/users/register-user",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useChangePasswordMutation,
} = authApi;
