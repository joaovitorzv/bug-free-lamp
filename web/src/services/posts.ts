import { current } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Posts } from "./types";

const POSTS_PAGE_LIMIT = 3;

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://dev.codeleap.co.uk" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Posts, number | void>({
      query: (offset = 0) =>
        `/careers/?offset=${offset}&limit=${POSTS_PAGE_LIMIT}`,
      transformResponse: (response: Posts, meta, arg) => {
        console.log(arg);
        return response;
      },
      providesTags: ["Post"],
    }),
    deletePost: builder.mutation<Posts, string>({
      query: (post_id) => {
        return {
          url: `/careers/${post_id}/`,
          method: "DELETE",
        };
      },
      async onQueryStarted(post_id, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          postsApi.util.updateQueryData("getPosts", undefined, (draft) => {
            // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
            console.log(current(draft));

            draft.results[0].title = "upou maluco";
            console.log(current(draft));
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetPostsQuery, useLazyGetPostsQuery, useDeletePostMutation } =
  postsApi;
