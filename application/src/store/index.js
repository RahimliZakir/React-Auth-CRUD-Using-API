import { configureStore } from "@reduxjs/toolkit";

import trucksSlice from "./trucks";

const store = configureStore({
  reducer: { trucks: trucksSlice },
});

export default store;
