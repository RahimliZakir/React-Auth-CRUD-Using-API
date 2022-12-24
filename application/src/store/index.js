import { configureStore } from "@reduxjs/toolkit";

import trucksSlice from "./trucks";
import busSlice from "./buses";

const store = configureStore({
  reducer: { trucks: trucksSlice, buses: busSlice },
});

export default store;
