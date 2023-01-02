import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../../api";

//* 1) Get All
export const getAllBuses = createAsyncThunk("/getallbuses", async () => {
  const { data } = await API.get("/buses");

  return data;
});

//* 2) Delete
export const deleteBus = createAsyncThunk(
  "/deletebus",
  async (id, { dispatch }) => {
    const { data } = await API.delete(`/buses/${id}`);

    await dispatch(getAllBuses());

    return data;
  }
);

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
        return { ...state, error: action.error, loading: false };
      })
      .addCase(deleteBus.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(deleteBus.fulfilled, (state) => {
        return { ...state, loading: false };
      })
      .addCase(deleteBus.rejected, (state, action) => {
        return { ...state, error: action.error, loading: false };
      });
  },
});

export default busSlice.reducer;
