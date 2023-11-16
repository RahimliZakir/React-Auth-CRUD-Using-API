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

//* 3) Create
export const createTruck = createAsyncThunk(
  "/createtruck",
  async (truck, { dispatch }) => {
    const result = await API.post("/trucks", truck, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await dispatch(getAllTrucks());

    return result;
  }
);

//* 4) Update
export const updateTruck = createAsyncThunk(
  "/updatetuck",
  async (bus, { dispatch }) => {
    const result = await API.put(`/trucks/${bus.id}`, bus, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await dispatch(getAllTrucks());

    return result;
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
      })
      .addCase(createTruck.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(createTruck.fulfilled, (state) => {
        return { ...state, loading: false };
      })
      .addCase(createTruck.rejected, (state, action) => {
        return { ...state, error: action.error, loading: false };
      })
      .addCase(updateTruck.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(updateTruck.fulfilled, (state) => {
        return { ...state, loading: false };
      })
      .addCase(updateTruck.rejected, (state, action) => {
        return { ...state, error: action.error, loading: false };
      });
  },
});

export default truckSlice.reducer;
