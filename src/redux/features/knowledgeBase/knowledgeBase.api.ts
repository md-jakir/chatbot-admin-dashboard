import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const knowledgeBaseApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    // addNewChatbot: build.mutation({
    //   query: ({ data, token }: any) => ({
    //     url: '/knowledgeBase',
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
    //     url: `/knowledgeBase/${id}`,
    //     method: 'PUT',
    //     body: data,

    //     headers: {
    //       Authorization: `${token}`,
    //     },

    //     contentType: 'multipart/form-data',
    //   }),
    //   invalidatesTags: [tagTypes.knowledgeBase],
    // }),

    getSingleknowledgeBase: build.query({
      query: (id: string | null) => `/knowledge-base/${id}`,
      invalidatesTags: [tagTypes.knowledgeBase],
    }),

    // getAllChatbots: build.query({
    //   query: (query: any, token: any) => ({
    //     url: `/knowledgeBase?${query}`,
    //     method: 'GET',
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   }),
    //   providesTags: [tagTypes.knowledgeBase],
    // }),
    // updateChatbotStatus: build.mutation({
    //   query: ({ id, data, token }: any) => ({
    //     url: `/knowledgeBase/${id}/active_status?active_status=${data?.active_status}`,
    //     method: 'PUT',
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   }),
    //   invalidatesTags: [tagTypes.knowledgeBase],
    // }),
    // updateChatbotRole: build.mutation({
    //   query: ({ id, data, token }: any) => ({
    //     url: `/knowledgeBase/${id}/role`,
    //     method: 'PATCH',
    //     body: data,
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   }),
    //   invalidatesTags: [tagTypes.knowledgeBase],
    // }),
    updateKnowledgeBaseStatus: build.mutation({
      query: ({ id, data, token }: any) => ({
        url: `/knowledge-base/${id}/active_status?active_status=${data?.active_status}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.knowledgeBase],
    }),
    deleteknowledgeBase: build.mutation({
      query: ({ id, token }: any) => ({
        url: `/knowledge-base/${id}`,
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
  useGetSingleknowledgeBaseQuery,
  useDeleteknowledgeBaseMutation,
  useUpdateKnowledgeBaseStatusMutation,
} = knowledgeBaseApi;
