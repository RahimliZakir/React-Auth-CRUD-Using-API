import { configureStore } from "@reduxjs/toolkit";

import carsSlice from "./cars";
import trucksSlice from "./trucks";
import busSlice from "./buses";

const store = configureStore({
  reducer: { cars: carsSlice, trucks: trucksSlice, buses: busSlice },
});

export default store;
