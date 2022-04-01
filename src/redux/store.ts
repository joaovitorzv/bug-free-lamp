import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import feedReducer from "../actions/feedSlice";
import sessionReducer from "../actions/sessionSlice";

const store = configureStore({
  reducer: {
    feed: feedReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export default store;
