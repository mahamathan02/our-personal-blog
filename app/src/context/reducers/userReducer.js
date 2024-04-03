import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    saveuser: (state, action) => {
      state.value = action.payload;
    },
    removeuser: (state) => {
      state.value = null;
    },
  },
});

export const { saveuser, removeuser } = userReducer.actions;

export default userReducer.reducer;
