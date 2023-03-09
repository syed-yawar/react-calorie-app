import { createSlice } from "@reduxjs/toolkit";
import { TOAST_TYPE } from "../../../constants";
import { openToast } from "../../../services/utils";

import { users } from "./thunk";

const INITIAL_STATE = {
  allUsers: [],
  loadingUsers: false,
};

const adminSlice = createSlice({
  extraReducers: builder => {
    builder.addCase(users.pending, state => {
      state.loadingUsers = true;
    });
    builder.addCase(users.fulfilled, (state, action) => {
      return { allUsers: action.payload, loadingUsers: false };
    });
    builder.addCase(users.rejected, (state, action) => {
      openToast(TOAST_TYPE.ERROR, action.payload?.statusMessage);
      return INITIAL_STATE;
    });
  },
  initialState: INITIAL_STATE,
  name: "user",
  reducers: {},
});

export { users } from "./thunk";
export const adminUsersReducer = adminSlice.reducer;
