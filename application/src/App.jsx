import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Loader from "./components/Loader";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";

import Register from "./components/auth/Register";
import SignIn from "./components/auth/SignIn";

import RouteGuard from "./components/guards/RouteGuard";

const Truck = lazy(() => import("./components/Truck"));
const Bus = lazy(() => import("./components/Bus"));

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="register" element={<Register />} />

          <Route path="main" element={<Navbar />}>
            <Route path="trucks" element={<RouteGuard component={Truck} />} />
            <Route path="buses" element={<RouteGuard component={Bus} />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>

      <ToastContainer />
    </div>
  );
};

export default App;
