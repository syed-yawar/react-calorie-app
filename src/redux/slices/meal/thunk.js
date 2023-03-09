import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserService } from "../../../services";

const userService = new UserService();

export const userMeals = createAsyncThunk("meals/all", async (data, thunkAPI) => {
  const response = await userService.allMeals(data);
  if (!response.success) {
    return thunkAPI.rejectWithValue({
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
    });
  }
  return response.data.userMeals;
});

export const addUserMeal = createAsyncThunk("meals/save", async (data, thunkAPI) => {
  const response = await userService.saveMeal(data);
  if (!response.success) {
    return thunkAPI.rejectWithValue({
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
    });
  }
  return response.data;
});
