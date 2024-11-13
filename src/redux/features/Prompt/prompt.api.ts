import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const promptApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    // addNewChatbot: build.mutation({
    //   query: ({ data, token }: any) => ({
    //     url: '/prompt',
    //     method: 'POST',
    //     body: data,
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   }),
    //   invalidatesTags: [tagTypes.chatbot],
    // }),

    // updateChatbot: build.mutation({
    //   query: ({ data, id, token }: any) => ({
    //     url: `/prompt/${id}`,
    //     method: 'PUT',
    //     body: data,

    //     headers: {
    //       Authorization: `${token}`,
    //     },

    //     contentType: 'multipart/form-data',
    //   }),
    //   invalidatesTags: [tagTypes.prompt],
    // }),

    getSingleprompt: build.query({
      query: (id: string | null) => `/prompt/${id}`,
      invalidatesTags: [tagTypes.prompt],
    }),

    // getAllChatbots: build.query({
    //   query: (query: any, token: any) => ({
    //     url: `/prompt?${query}`,
    //     method: 'GET',
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   }),
    //   providesTags: [tagTypes.prompt],
    // }),
    // updateChatbotStatus: build.mutation({
    //   query: ({ id, data, token }: any) => ({
    //     url: `/prompt/${id}/active_status?active_status=${data?.active_status}`,
    //     method: 'PUT',
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   }),
    //   invalidatesTags: [tagTypes.prompt],
    // }),
    // updateChatbotRole: build.mutation({
    //   query: ({ id, data, token }: any) => ({
    //     url: `/prompt/${id}/role`,
    //     method: 'PATCH',
    //     body: data,
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   }),
    //   invalidatesTags: [tagTypes.prompt],
    // }),
    updatePromptStatus: build.mutation({
      query: ({ id, data, token }: any) => ({
        url: `/prompt/${id}/active_status?active_status=${data?.active_status}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.prompt],
    }),
    deleteprompt: build.mutation({
      query: ({ id, token }: any) => ({
        url: `/prompt/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.chatbot],
    }),
  }),
});

export const {
  useGetSinglepromptQuery,
  useDeletepromptMutation,
  useUpdatePromptStatusMutation,
} = promptApi;
