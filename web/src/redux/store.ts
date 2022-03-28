import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import postsReducer from "../actions/postsSlice";
import sessionReducer from "../actions/sessionSlice";
import { postsApi } from "../services/posts";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    session: sessionReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
