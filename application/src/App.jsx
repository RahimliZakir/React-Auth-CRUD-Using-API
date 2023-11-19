import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "./components/Loader";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Truck from "./components/Truck";
import Bus from "./components/Bus";

import Register from "./components/auth/Register";
import SignIn from "./components/auth/SignIn";

import RouteGuard from "./components/guards/RouteGuard";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="register"
          element={
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="signin"
          element={
            <Suspense fallback={<Loader />}>
              <SignIn />
            </Suspense>
          }
        />
        <Route path="/" element={<Navbar />}>
          <Route index element={<RouteGuard component={Truck} />} />
          <Route path="trucks" element={<RouteGuard component={Truck} />} />
          <Route path="buses" element={<RouteGuard component={Bus} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
