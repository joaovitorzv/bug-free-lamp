import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { retrieveSession } from "../auth/session";
import { RootState } from "../redux/store";

interface SessionState {
  username: string | null;
}

const username = retrieveSession();
const initialState: SessionState = {
  username,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<SessionState>) => {
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
