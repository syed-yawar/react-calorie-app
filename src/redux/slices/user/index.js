import { createSlice } from "@reduxjs/toolkit";
import { TOAST_TYPE } from "../../../constants";
import { openToast } from "../../../services/utils";

import { authenticate, register } from "./thunk";

const user = JSON.parse(localStorage.getItem("user"));
const BASE_STATE = {
  calorieThreshold: null,
  email: null,
  id: null,
  userName: null,
  isLoading: false,
  token: null,
  role: null,
};
const INITIAL_STATE = {
  calorieThreshold: user?.calorieThreshold || null,
  email: user?.email || null,
  id: user?.id || null,
  userName: user?.userName || null,
  isLoading: false,
  token: user?.token || "",
  role: user?.role || null,
};

const userSlice = createSlice({
  extraReducers: builder => {
    builder.addCase(authenticate.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(authenticate.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", JSON.stringify(action?.payload?.token));
      return { ...action.payload, isLoading: false };
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      openToast(TOAST_TYPE.ERROR, action.payload?.statusMessage);

      return BASE_STATE;
    });
    builder.addCase(register.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", JSON.stringify(action?.payload?.token));

      return { ...action.payload, isLoading: false };
    });
    builder.addCase(register.rejected, (state, action) => {
      openToast(TOAST_TYPE.ERROR, action.payload?.statusMessage);
      return BASE_STATE;
    });
    // // and provide a default case if no other handlers matched
    // .addDefaultCase((state, action) => {
    //   return state;
    // });
  },
  initialState: INITIAL_STATE,
  name: "user",
  reducers: {
    logout: state => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return BASE_STATE;
    },
  },
});

export { authenticate, register } from "./thunk";
export const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
