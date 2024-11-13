import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const sampleQustionApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    addNewSampleQustion: build.mutation({
      query: ({ data, token }: any) => ({
        url: '/sample-qustion',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.chatbot],
    }),

    updateSampleQustion: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/sample-qustion/${id}`,
        method: 'PUT',
        body: data,

        headers: {
          Authorization: `${token}`,
        },

        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [tagTypes.sampleQustion],
    }),

    getSingleSampleQustion: build.query({
      query: (id: string | null) => `/sample-qustion/${id}`,
      invalidatesTags: [tagTypes.sampleQustion],
    }),

    // getAllChatbots: build.query({
    //   query: (query: any, token: any) => ({
    //     url: `/sampleQustion?${query}`,
    //     method: 'GET',
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   }),
    //   providesTags: [tagTypes.sampleQustion],
    // }),
    // updateChatbotStatus: build.mutation({
    //   query: ({ id, data, token }: any) => ({
    //     url: `/sampleQustion/${id}/active_status?active_status=${data?.active_status}`,
    //     method: 'PUT',
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   }),
    //   invalidatesTags: [tagTypes.sampleQustion],
    // }),
    // updateChatbotRole: build.mutation({
    //   query: ({ id, data, token }: any) => ({
    //     url: `/sampleQustion/${id}/role`,
    //     method: 'PATCH',
    //     body: data,
    //     headers: {
    //       Authorization: `${token}`,
    //     },
    //   }),
    //   invalidatesTags: [tagTypes.sampleQustion],
    // }),

    deleteSampleQustion: build.mutation({
      query: ({ id, token }: any) => ({
        url: `/sample-qustion/${id}`,
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
  useAddNewSampleQustionMutation,
  useUpdateSampleQustionMutation,
  useGetSingleSampleQustionQuery,
  useDeleteSampleQustionMutation,
} = sampleQustionApi;
