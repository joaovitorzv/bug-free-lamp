import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import postsReducer from "../actions/feedSlice";
import sessionReducer from "../actions/sessionSlice";

const store = configureStore({
  reducer: {
    feed: postsReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export default store;
