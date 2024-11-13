import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginAdmin: build.mutation({
      query: (data) => ({
        url: `auth/admin/login`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    forgotPassword: build.mutation({
      query: (email) => ({
        url: `auth/admin/forgot-password?email=${email}`,
        method: 'POST',
      }),
    }),

    resetPassword: build.mutation({
      query: ({ password, token }) => ({
        url: `auth/admin/reset-password?token=${token}&password=${password}`,
        method: 'POST',
      }),
    }),

    deleteUser: build.mutation({
      query: ({ id, token }) => ({
        url: `/admin/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
