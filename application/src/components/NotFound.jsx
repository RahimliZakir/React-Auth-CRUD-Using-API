import React from "react";

import image from "../images/notfound.png";

const NotFound = () => {
  return (
    <section id="not-found">
      <div className="img-div">
        <img className="w-100" src={image} alt="Not Found Img" />
      </div>
    </section>
  );
};

export default NotFound;
