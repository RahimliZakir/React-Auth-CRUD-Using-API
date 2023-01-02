import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../../api";

//* 1) Get All
export const getAllCars = createAsyncThunk("/getallcars", async () => {
  const { data } = await API.get("/cars");

  return data;
});

//* 2) Delete
export const deleteCar = createAsyncThunk(
  "/deletecar",
  async (id, { dispatch }) => {
    const { data } = await API.delete(`/cars/${id}`);

    await dispatch(getAllCars());

    return data;
  }
);

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
      })
      .addCase(deleteCar.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(deleteCar.fulfilled, (state) => {
        return { ...state, loading: false };
      })
      .addCase(deleteCar.rejected, (state, action) => {
        return { ...state, error: action.error, loading: false };
      });
  },
});

export default carsSlice.reducer;
