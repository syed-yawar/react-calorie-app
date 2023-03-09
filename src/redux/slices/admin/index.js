import { createSlice } from "@reduxjs/toolkit";
import { TOAST_TYPE } from "../../../constants";
import { openToast } from "../../../services/utils";

import { userMeals, addUserMealByAdmin, deleteMeal, editUserMeal, getDashBoardData } from "./thunk";

const INITIAL_STATE = {
  allMeals: [],
  dashboard: {},
  loadingMeals: false,
  isAddedEditMeal: false,
  isEditMealLoading: false,
  isDashBoardLoading: false,
};

const adminSlice = createSlice({
  extraReducers: builder => {
    builder.addCase(userMeals.pending, state => {
      state.loadingMeals = true;
    });
    builder.addCase(userMeals.fulfilled, (state, action) => {
      state.allMeals = action.payload;
      state.loadingMeals = false;
    });
    builder.addCase(userMeals.rejected, (state, action) => {
      openToast(TOAST_TYPE.ERROR, action.payload?.statusMessage);
      return INITIAL_STATE;
    });
    builder.addCase(addUserMealByAdmin.pending, state => {
      state.isAddedEditMeal = true;
    });
    builder.addCase(addUserMealByAdmin.fulfilled, (state, action) => {
      state.allMeals.unshift(action.payload);
      state.isAddedEditMeal = false;
    });
    builder.addCase(addUserMealByAdmin.rejected, (state, action) => {
      openToast(TOAST_TYPE.ERROR, action.payload?.statusMessage);
      return INITIAL_STATE;
    });
    builder.addCase(deleteMeal.pending, state => {
      //   state.isAddedEditMeal = true;
    });
    builder.addCase(deleteMeal.fulfilled, (state, action) => {
      state.allMeals = state.allMeals.filter(meal => meal._id != action.payload);
    });
    builder.addCase(deleteMeal.rejected, (state, action) => {
      openToast(TOAST_TYPE.ERROR, action.payload?.statusMessage);
      //   return INITIAL_STATE;
    });
    builder.addCase(editUserMeal.pending, state => {
      state.isEditMealLoading = true;
    });
    builder.addCase(editUserMeal.fulfilled, (state, action) => {
      const respMeal = action.payload;
      const index = state.allMeals.findIndex(meal => meal._id == respMeal._id);
      state.allMeals[index] = respMeal;
      state.isEditMealLoading = false;
    });
    builder.addCase(editUserMeal.rejected, (state, action) => {
      openToast(TOAST_TYPE.ERROR, action.payload?.statusMessage);
      //   return INITIAL_STATE;
    });
    builder.addCase(getDashBoardData.pending, state => {
      state.isDashBoardLoading = true;
    });
    builder.addCase(getDashBoardData.fulfilled, (state, action) => {
      state.dashboard = action.payload;
      state.isDashBoardLoading = false;
    });
    builder.addCase(getDashBoardData.rejected, (state, action) => {
      openToast(TOAST_TYPE.ERROR, action.payload?.statusMessage);
      //   return INITIAL_STATE;
    });
  },
  initialState: INITIAL_STATE,
  name: "user",
  reducers: {},
});

export { userMeals, addUserMealByAdmin, deleteMeal, editUserMeal, getDashBoardData } from "./thunk";
export const adminReducer = adminSlice.reducer;
