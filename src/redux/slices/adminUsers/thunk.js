import { createAsyncThunk } from "@reduxjs/toolkit";

import { AdminService } from "../../../services/admin";

const adminService = new AdminService();
export const users = createAsyncThunk("admin/users", async (data, thunkAPI) => {
  const response = await adminService.getAllUsers();
  if (!response.success) {
    return thunkAPI.rejectWithValue({
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
    });
  }
  return response.data;
});
