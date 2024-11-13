import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const adminApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    // addNewAdmin: build.mutation({
    //   query: ({ data, token }: any) => ({
    //     url: '/admin',
    //     method: 'POST',
    //     // body: data,
    //     body: JSON.stringify(data),
    //     headers: {

    //       Authorization: `${token}`,
    //     },

    //   }),
    //   invalidatesTags: [tagTypes.admin],
    // }),

    addNewAdmin: build.mutation({
      query: ({ data, token }: any) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value as string);
        });

        return {
          url: '/admin',
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),

    updateAdmin: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/admin/${id}`,
        method: 'PUT',
        body: data,

        headers: {
          Authorization: `${token}`,
        },

        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    updateAvatarAdmin: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/admin/${id}/upload-avater`,
        method: 'PUT',
        body: data,

        headers: {
          Authorization: `${token}`,
        },

        // contentType: 'multipart/form-data',
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    getSingleAdmin: build.query({
      query: (id: string | null) => `/admin/${id}`,
      invalidatesTags: [tagTypes.admin],
    }),

    getAllAdmins: build.query({
      query: (query: any, token: any) => ({
        url: `/admin?${query}`,
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [tagTypes.admin],
    }),
    updateAdminRole: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/admin/${id}/role`,
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    updatePasswordAdmin: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/admin/${id}/update-password`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    deleteAdmin: build.mutation({
      query: ({ id, token }: any) => ({
        url: `/admin/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useAddNewAdminMutation,
  useUpdatePasswordAdminMutation,
  useUpdateAvatarAdminMutation,
  useGetSingleAdminQuery,
  useUpdateAdminMutation,
  useGetAllAdminsQuery,
  useUpdateAdminRoleMutation,
  useDeleteAdminMutation,
} = adminApi;
