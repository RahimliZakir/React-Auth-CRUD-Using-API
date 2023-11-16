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

//* 3) Create
export const createBus = createAsyncThunk(
  "/createbus",
  async (bus, { dispatch }) => {
    const result = await API.post("/buses", bus, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await dispatch(getAllBuses());

    return result;
  }
);

//* 4) Update
export const updateBus = createAsyncThunk(
  "/updatebus",
  async (bus, { dispatch }) => {
    const result = await API.put(`/buses/${bus.id}`, bus, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await dispatch(getAllBuses());

    return result;
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
      })
      .addCase(createBus.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(createBus.fulfilled, (state) => {
        return { ...state, loading: false };
      })
      .addCase(createBus.rejected, (state, action) => {
        return { ...state, error: action.error, loading: false };
      })
      .addCase(updateBus.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(updateBus.fulfilled, (state) => {
        return { ...state, loading: false };
      })
      .addCase(updateBus.rejected, (state, action) => {
        return { ...state, error: action.error, loading: false };
      });
  },
});

export default busSlice.reducer;
