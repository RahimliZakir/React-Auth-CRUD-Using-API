import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../../api";

//* 1) Get All
export const getAllCars = createAsyncThunk("/getallcars", async () => {
  const { data } = await API.get("/cars");

  return data;
});

const initialState = {
  list: [],
  error: "",
  loading: false,
};

const carsSlice = createSlice({
  name: "carSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCars.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getAllCars.fulfilled, (state, action) => {
        return { ...state, list: action.payload, loading: false };
      })
      .addCase(getAllCars.rejected, (state, action) => {
        return { ...state, error: action.error, loading: false };
      });
  },
});

export default carsSlice.reducer;