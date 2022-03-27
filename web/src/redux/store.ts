import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../actions/postsSlice";
import sessionSlice from "../actions/sessionSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    session: sessionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
