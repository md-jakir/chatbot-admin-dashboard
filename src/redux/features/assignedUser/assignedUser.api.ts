import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const userChatbotApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getSingleuserChatbot: build.query({
      query: (id: string | null) => `/user-chatbot/${id}`,
      invalidatesTags: [tagTypes.userChatbot],
    }),

    bulkUpdateAssignedUser: build.mutation({
      query: ({ id, data, modelId, token }: any) => ({
        url: `/user-chatbot/upload-bulk?chatbot_id=${id}&model_id=${modelId}`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.userChatbot],
    }),

    updateUserChatbot: build.mutation({
      query: ({ id, data, token }: any) => ({
        url: `/user-chatbot/${id}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.userChatbot],
    }),

    updateUserChatbotStatus: build.mutation({
      query: ({ id, data, token }: any) => ({
        url: `/user-chatbot/${id}/active_status?active_status=${data?.active_status}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.userChatbot],
    }),
    deleteUserChatbot: build.mutation({
      query: ({ id, token }: any) => ({
        url: `/user-chatbot/${id}`,
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
  useGetSingleuserChatbotQuery,
  useDeleteUserChatbotMutation,
  useUpdateUserChatbotStatusMutation,
  useBulkUpdateAssignedUserMutation,
  useUpdateUserChatbotMutation,
} = userChatbotApi;
