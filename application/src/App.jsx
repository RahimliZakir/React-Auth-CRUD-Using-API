import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Car from "./components/Car";
import Truck from "./components/Truck";
import Bus from "./components/Bus";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="cars" element={<Car />} />
          <Route path="trucks" element={<Truck />} />
          <Route path="buses" element={<Bus />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
