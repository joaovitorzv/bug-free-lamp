import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Posts } from "./types";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://dev.codeleap.co.uk/careers/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Posts, void>({
      query: () => "/",
      providesTags: ["Post"],
    }),
    deletePost: builder.mutation<Posts, string>({
      query: (post_id) => {
        return {
          url: `/${post_id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useGetPostsQuery, useDeletePostMutation } = postsApi;
