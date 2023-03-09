import { configureStore } from "@reduxjs/toolkit";

import { userReducer, mealReducer, adminReducer, adminUsersReducer } from "./slices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    meals: mealReducer,
    admin: adminReducer,
    adminUsers: adminUsersReducer,
  },
});
