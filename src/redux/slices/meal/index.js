import { createSlice } from "@reduxjs/toolkit";
import { TOAST_TYPE } from "../../../constants";
import { openToast } from "../../../services/utils";
import moment from "moment";

import { userMeals, addUserMeal } from "./thunk";

const INITIAL_STATE = {
  allMeals: [],
  loadingMeals: false,
  isAddedEditMeal: false,
};

const mealSlice = createSlice({
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
    builder.addCase(addUserMeal.pending, state => {
      state.isAddedEditMeal = true;
    });
    builder.addCase(addUserMeal.fulfilled, (state, action) => {
      const { date } = action.payload;

      const formattedDate = moment(date).format("YYYY-MM-DD");
      const allMeals = state.allMeals.find(x => x.date === formattedDate);
      if (allMeals) {
        allMeals.meals.unshift(action.payload);
        allMeals.totalCalories += +action.payload.calorie;
      } else {
        const day = {
          totalCalories: +action.payload.calorie,
          date: formattedDate,
          meals: [action.payload],
        };
        state.allMeals.unshift(day);
      }
      state.isAddedEditMeal = false;
    });
    builder.addCase(addUserMeal.rejected, (state, action) => {
      openToast(TOAST_TYPE.ERROR, action.payload?.statusMessage);
      return INITIAL_STATE;
    });
  },
  initialState: INITIAL_STATE,
  name: "user",
  reducers: {},
});

export { userMeals, addUserMeal } from "./thunk";
export const mealReducer = mealSlice.reducer;
