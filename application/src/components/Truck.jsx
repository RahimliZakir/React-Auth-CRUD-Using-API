import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllTrucks } from "../store/trucks";

const Truck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTrucks());

    // eslint-disable-next-line
  }, []);

  const trucks = useSelector((state) => state.trucks);

  console.log(trucks);

  return <div>Truck</div>;
};

export default Truck;
