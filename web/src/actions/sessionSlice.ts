import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

type initialStateType = { username: string | null };
const initialState: initialStateType = {
  username: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<initialStateType>) => {
      state.username = action.payload.username;
    },
    signout: (state) => {
      state.username = null;
    },
  },
});

export const selectSession = (state: RootState) => state.session;

export const { signup, signout } = sessionSlice.actions;
export default sessionSlice.reducer;
