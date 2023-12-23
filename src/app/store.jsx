import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthApi } from "../services/userAuthApi";
import authToken from "../features/authSlice";
import userInfo from "../features/userSlice";
import { roomItemsApi } from "../services/roomItems";

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    auth: authToken,
    user: userInfo,
    [roomItemsApi.reducerPath]: roomItemsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAuthApi.middleware,
      roomItemsApi.middleware
    ),
});

setupListeners(store.dispatch);
