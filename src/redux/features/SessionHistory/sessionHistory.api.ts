import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const feedbackApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    addNewFeedback: build.mutation({
      query: ({ data, token }: any) => ({
        url: '/session-history',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.chatbot],
    }),

    updateFeedback: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/session-history/${id}`,
        method: 'PUT',
        body: data,

        headers: {
          Authorization: `${token}`,
        },

        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    getSingleFeedback: build.query({
      query: (id: string | null) => `/session-history/${id}`,
      invalidatesTags: [tagTypes.feedback],
    }),

    getAllFeedbacks: build.query({
      query: (query: any, token: any) => ({
        url: `/session-history?${query}`,
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [tagTypes.feedback],
    }),
    // updateChatbotStatus: build.mutation({
    //   query: ({ id, data, token }: any) => ({
    //     url: `/feedback/${id}/active_status?active_status=${data?.active_status}`,
    //     method: 'PUT',
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   }),
    //   invalidatesTags: [tagTypes.feedback],
    // }),
    // updateChatbotRole: build.mutation({
    //   query: ({ id, data, token }: any) => ({
    //     url: `/feedback/${id}/role`,
    //     method: 'PATCH',
    //     body: data,
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   }),
    //   invalidatesTags: [tagTypes.feedback],
    // }),

    deleteFeedback: build.mutation({
      query: ({ id, token }: any) => ({
        url: `/session-history/${id}`,
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
  useGetAllFeedbacksQuery,
  useAddNewFeedbackMutation,
  useUpdateFeedbackMutation,
  useGetSingleFeedbackQuery,
  useDeleteFeedbackMutation,
} = feedbackApi;
