import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Posts, PostType, POSTS_PER_PAGE } from "../types/posts.d";

interface FeedState {
  posts: PostType[];
  status: "idle" | "loading" | "ok" | "failed";
  error: string | null;
  posts_count: number;
}

const BASE_URL = "https://dev.codeleap.co.uk";

const initialState: FeedState = {
  posts: [],
  status: "idle",
  error: null,
  posts_count: 0,
};

export const fetchPosts = createAsyncThunk<Posts, number>(
  "feed/getPosts",
  async (offset: number) => {
    const response = await fetch(
      `${BASE_URL}/careers/?offset=${offset}&limit=${POSTS_PER_PAGE}/`
    );
    return await response.json();
  }
);

export const createPost = createAsyncThunk(
  "feed/createPost",
  async (createPostBody: Omit<PostType, "id" | "created_datetime">) => {
    const response = await fetch(`${BASE_URL}/careers/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createPostBody),
    });

    return await response.json();
  }
);

export const editPost = createAsyncThunk(
  "feed/editPost",
  async (editPostBody: Omit<PostType, "created_datetime" | "username">) => {
    const response = await fetch(`${BASE_URL}/careers/${editPostBody.id}/`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editPostBody.title,
        content: editPostBody.content,
      }),
    });

    return await response.json();
  }
);

export const deletePost = createAsyncThunk(
  "feed/deletePost",
  async (postId: number) => {
    const response = await fetch(`${BASE_URL}/careers/${postId}/`, {
      method: "DELETE",
    });

    return await response.ok;
  }
);

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = "something failed while fecthing the posts.";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "ok";
        state.posts.push(...action.payload.results);
        state.posts_count = action.payload.count;
      });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts.unshift(action.payload);
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const deletePostIdx = state.posts.findIndex(
        (post) => post.id === action.meta.arg
      );
      state.posts.splice(deletePostIdx, 1);
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      const editPostIdx = state.posts.findIndex(
        (post) => post.id === action.meta.arg.id
      );

      state.posts[editPostIdx] = { ...action.payload };
    });
  },
});

export default feedSlice.reducer;
