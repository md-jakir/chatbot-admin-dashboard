import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const analyticsApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    // addNewChatbot: build.mutation({
    //   query: ({ data, token }: any) => ({
    //     url: '/analytics',
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
    //     url: `/analytics/${id}`,
    //     method: 'PUT',
    //     body: data,

    //     headers: {
    //       Authorization: `${token}`,
    //     },

    //     contentType: 'multipart/form-data',
    //   }),
    //   invalidatesTags: [tagTypes.analytics],
    // }),

    getSingleanalytics: build.query({
      query: (id: string | null) => `/analytics/${id}`,
      invalidatesTags: [tagTypes.analytics],
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetSingleanalyticsQuery } = analyticsApi;
