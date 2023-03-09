import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserService } from "../../../services";
import { AdminService } from "../../../services/admin";

const userService = new UserService();
export const authenticate = createAsyncThunk("user/login", async (data, thunkAPI) => {
  const response = await userService.login(data);
  if (!response.success) {
    return thunkAPI.rejectWithValue({
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
    });
  }
  return response.data;
});
export const register = createAsyncThunk("user/register", async (data, thunkAPI) => {
  const response = await userService.register(data);
  if (!response.success) {
    return thunkAPI.rejectWithValue({
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
    });
  }
  return response.data;
});
