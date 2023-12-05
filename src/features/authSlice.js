import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
