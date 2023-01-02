import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../../api";

//* 1) Get All
export const getAllTrucks = createAsyncThunk("/getalltrucks", async () => {
  const { data } = await API.get("/trucks");

  return data;
});

//* 2) Delete
export const deleteTruck = createAsyncThunk(
  "/deletetruck",
  async (id, { dispatch }) => {
    const { data } = await API.delete(`/trucks/${id}`);

    await dispatch(getAllTrucks());

    return data;
  }
);

const initialState = {
  list: [],
  error: "",
  loading: false,
};

const truckSlice = createSlice({
  name: "truckSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTrucks.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(getAllTrucks.fulfilled, (state, action) => {
        return { ...state, list: action.payload, loading: false };
      })
      .addCase(getAllTrucks.rejected, (state, action) => {
        return { ...state, error: action.error, loading: false };
      })
      .addCase(deleteTruck.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(deleteTruck.fulfilled, (state) => {
        return { ...state, loading: false };
      })
      .addCase(deleteTruck.rejected, (state, action) => {
        return { ...state, error: action.error, loading: false };
      });
  },
});

export default truckSlice.reducer;
