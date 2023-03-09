import { createAsyncThunk } from "@reduxjs/toolkit";

import { AdminService } from "../../../services/admin";

const adminService = new AdminService();

export const userMeals = createAsyncThunk("admin/meals/all", async (data, thunkAPI) => {
  const response = await adminService.allMeals(data);
  if (!response.success) {
    return thunkAPI.rejectWithValue({
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
    });
  }
  return response.data;
});
export const addUserMealByAdmin = createAsyncThunk("admin/meal/save", async (data, thunkAPI) => {
  const response = await adminService.saveMeal(data);
  if (!response.success) {
    return thunkAPI.rejectWithValue({
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
    });
  }
  return response.data;
});

export const deleteMeal = createAsyncThunk("admin/meal/delete", async (id, thunkAPI) => {
  const response = await adminService.deleteMeal(id);
  if (!response.success) {
    return thunkAPI.rejectWithValue({
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
    });
  }
  return id;
});
export const editUserMeal = createAsyncThunk("admin/meals/update", async (data, thunkAPI) => {
  const response = await adminService.updateMeal(data);
  if (!response.success) {
    return thunkAPI.rejectWithValue({
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
    });
  }
  return data;
});

export const getDashBoardData = createAsyncThunk("admin/dashboard", async (data, thunkAPI) => {
  const response = await adminService.getDashboard();
  if (!response.success) {
    return thunkAPI.rejectWithValue({
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
    });
  }
  return response.data;
});
