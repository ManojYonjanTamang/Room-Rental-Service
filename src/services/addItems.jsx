import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomItemsApi = createApi({
  reducerPath: "roomItemsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
  }),
  endpoints: (builder) => ({
    getRoomPosts: builder.query({
      query: () => {
        return {
          url: "post/",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetRoomPostsQuery } = roomItemsApi;
