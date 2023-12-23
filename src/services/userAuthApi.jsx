import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/user/",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "register/",
          method: "POST",
          body: user,
          headers: { "Content-type": "application/json" },
        };
      },
    }),

    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: "login/",
          method: "POST",
          body: user,
          headers: { "Content-type": "application/json" },
        };
      },
    }),

    getLoggedUser: builder.query({
      query: (accessToken) => {
        return {
          url: "profile/",
          method: "GET",
          headers: { authorization: `Bearer ${accessToken}` },
        };
      },
    }),

    changeUserPassword: builder.mutation({
      query: ({ actualData, accessToken }) => {
        return {
          url: "changepassword/",
          method: "POST",
          body: actualData,
          headers: { authorization: `Bearer ${accessToken}` },
        };
      },
    }),

    forgotPwdSendEmail: builder.mutation({
      query: (user) => {
        return {
          url: "password_reset_email/",
          method: "POST",
          body: user,
          headers: { "Content-type": "application/json" },
        };
      },
    }),

    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `/reset_password/${id}/${token}/`,
          method: "POST",
          body: actualData,
          headers: { "Content-type": "application/json" },
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetLoggedUserQuery,
  useChangeUserPasswordMutation,
  useForgotPwdSendEmailMutation,
  useResetPasswordMutation,
} = userAuthApi;
