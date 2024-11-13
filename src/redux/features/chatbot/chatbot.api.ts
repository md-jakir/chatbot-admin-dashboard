import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const chatbotApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    addNewChatbot: build.mutation({
      query: ({ data, token }: any) => ({
        url: '/chatbot',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.chatbot],
    }),

    updateChatbot: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/chatbot/${id}`,
        method: 'PUT',
        body: data,

        headers: {
          Authorization: `${token}`,
        },

        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [tagTypes.chatbot],
    }),

    getSingleChatbot: build.query({
      query: (id: string | null) => `/chatbot/${id}`,
      invalidatesTags: [tagTypes.chatbot],
    }),

    getAllChatbots: build.query({
      query: (query: any, token: any) => ({
        url: `/chatbot?${query}`,
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [tagTypes.chatbot],
    }),

    getKnowledgeBaseByChatbotId: build.query({
      query: (id: string) => `/chatbot/${id}/knowledge_base`,
      invalidatesTags: [tagTypes.knowledgeBase],
    }),
    getSampleQustionByChatbotId: build.query({
      query: (id: string) => `/chatbot/${id}/sample_qustion`,
      invalidatesTags: [tagTypes.sampleQustion],
    }),
    getPromptByChatbotId: build.query({
      query: (id: string) => `/chatbot/${id}/prompt`,
      invalidatesTags: [tagTypes.prompt],
    }),
    getAssignedUsersByChatbotId: build.query({
      query: ({ id, query }: { id: string; query: string }) =>
        `/chatbot/${id}/assigned_users?${query}`,
      invalidatesTags: [tagTypes.chatbot],
    }),
    updateChatbotStatus: build.mutation({
      query: ({ id, data, token }: any) => ({
        url: `/chatbot/${id}/active_status?active_status=${data?.active_status}`,
        method: 'PUT',
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.chatbot],
    }),
    updateChatbotRole: build.mutation({
      query: ({ id, data, token }: any) => ({
        url: `/chatbot/${id}/role`,
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.chatbot],
    }),
    updateKnowledgeBase: build.mutation({
      query: ({ id, data, token }: any) => ({
        url: `/chatbot/${id}/knowledge_base`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.chatbot],
    }),
    updatePrompt: build.mutation({
      query: ({ id, data, token }: any) => ({
        url: `/chatbot/${id}/prompt`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.prompt],
    }),
    deleteChatbot: build.mutation({
      query: ({ id, token }: any) => ({
        url: `/chatbot/${id}`,
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
  useAddNewChatbotMutation,
  useGetSingleChatbotQuery,
  useUpdateChatbotMutation,
  useGetAllChatbotsQuery,
  useUpdateChatbotRoleMutation,
  useDeleteChatbotMutation,
  useUpdateChatbotStatusMutation,
  useUpdateKnowledgeBaseMutation,
  useGetKnowledgeBaseByChatbotIdQuery,
  useGetSampleQustionByChatbotIdQuery,
  useGetAssignedUsersByChatbotIdQuery,
  useGetPromptByChatbotIdQuery,
  useUpdatePromptMutation,
} = chatbotApi;
