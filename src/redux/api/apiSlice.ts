import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tagTypesList } from '../tag-types';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT }),
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});

export default api;
