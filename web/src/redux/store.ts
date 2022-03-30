import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../actions/feedSlice";
import sessionReducer from "../actions/sessionSlice";

const store = configureStore({
  reducer: {
    feed: postsReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
