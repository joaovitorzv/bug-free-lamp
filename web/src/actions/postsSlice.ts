import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

const initialState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<typeof initialState[number]>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
    postDeleted: (state, action) => {
      return state.filter((post) => post.id !== action.payload);
    },
    postEdited: (state, action) => {
      const editPostIndex = state.findIndex(
        (post) => post.id === action.payload.id
      );
      state[editPostIndex] = { ...action.payload };
    },
  },
});

export const selectPosts = (state: RootState) => state.posts;

export const { postAdded, postDeleted, postEdited } = postsSlice.actions;
export default postsSlice.reducer;
