import api from '@/redux/api/apiSlice';
import { tagTypes } from '@/redux/tag-types';

const widgetConfigApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    addNewWidgetConfig: build.mutation({
      query: ({ data, token }: any) => ({
        url: '/widget',
        method: 'POST',
        // body: data,
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: [tagTypes.widgetConfig],
    }),

    updateWidgetConfig: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/widget/${id}`,
        method: 'PUT',
        body: data,

        headers: {
          Authorization: `${token}`,
        },

        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [tagTypes.widgetConfig],
    }),

    getSingleWidgetConfig: build.query({
      query: (id: string | null) => `/widget/${id}`,
      invalidatesTags: [tagTypes.widgetConfig],
    }),

    // getWidgetConfigAsOptions: build.query({
    //   query: () => '/widgetConfig/all/options',
    //   providesTags: [tagTypes.widgetConfig],
    // }),

    getAllWidgetConfigs: build.query({
      query: (query: any, token: any) => ({
        url: `/widget?${query}`,
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: [tagTypes.widgetConfig],
    }),

    getWidgetConfigsAsOptions: build.query({
      query: () => '/widget/options',
      providesTags: [tagTypes.widgetConfig],
    }),
    updateWidgetConfigRole: build.mutation({
      query: ({ data, id, token }: any) => ({
        url: `/widget/${id}/role`,
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.widgetConfig],
    }),
    deleteWidgetConfig: build.mutation({
      query: ({ id, token }: any) => ({
        url: `/widget/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: [tagTypes.widgetConfig],
    }),
  }),
});

export const {
  useAddNewWidgetConfigMutation,
  useGetSingleWidgetConfigQuery,
  useUpdateWidgetConfigMutation,
  useGetAllWidgetConfigsQuery,
  useUpdateWidgetConfigRoleMutation,
  useDeleteWidgetConfigMutation,
  useGetWidgetConfigsAsOptionsQuery,
  // useGetWidgetConfigAsOptionsQuery,
} = widgetConfigApi;
