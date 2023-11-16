import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "./components/Loader";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Truck from "./components/Truck";
import Bus from "./components/Bus";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <Truck />
              </Suspense>
            }
          />
          <Route
            path="trucks"
            element={
              <Suspense fallback={<Loader />}>
                <Truck />
              </Suspense>
            }
          />
          <Route
            path="buses"
            element={
              <Suspense fallback={<Loader />}>
                <Bus />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
