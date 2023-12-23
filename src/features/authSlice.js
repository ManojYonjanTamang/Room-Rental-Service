import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },

    unSetUserToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setUserToken, unSetUserToken } = authSlice.actions;

export default authSlice.reducer;
