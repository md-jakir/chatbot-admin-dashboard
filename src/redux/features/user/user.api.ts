import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const userApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    addNewUser: build.mutation({
      query: ({ data, token }: any) => ({
        url: '/user',
        method: 'POST',
        // body: data,
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: [tagTypes.user],
    }),

    updateUser: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: data,

        headers: {
          Authorization: `${token}`,
        },

        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getSingleUser: build.query({
      query: (id: string | null) => `/user/${id}`,
      invalidatesTags: [tagTypes.user],
    }),

    // getUserAsOptions: build.query({
    //   query: () => '/user/all/options',
    //   providesTags: [tagTypes.user],
    // }),

    getAllUsers: build.query({
      query: (query: any, token: any) => ({
        url: `/user?${query}`,
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [tagTypes.user],
    }),

    getUsersAsOptions: build.query({
      query: (query: string) => `/user/all/options?${query}`,
      providesTags: [tagTypes.user, tagTypes.userChatbot],
    }),
    updateUserRole: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/user/${id}/role`,
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.user],
    }),
    deleteUser: build.mutation({
      query: ({ id, token }: any) => ({
        url: `/user/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useAddNewUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetUsersAsOptionsQuery,
  // useGetUserAsOptionsQuery,
} = userApi;
