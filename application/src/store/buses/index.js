import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../../api";

//* 1) Get All
export const getAllBuses = createAsyncThunk("/getallbuses", async () => {
  const { data } = await API.get("/buses");

  return data;
});

const initialState = {
  list: [],
  error: "",
  loading: false,
};

const busSlice = createSlice({
  name: "busSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBuses.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getAllBuses.fulfilled, (state, action) => {
        return { ...state, list: action.payload, loading: false };
      })
      .addCase(getAllBuses.rejected, (state, action) => {
        return { ...state, list: action.error, loading: false };
      });
  },
});

export default busSlice.reducer;
