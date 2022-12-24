import React from "react";
import { Link, Outlet } from "react-router-dom";

import { routes } from "../routes";
import { capitalize } from "../utils/text";

const Navbar = () => {
  return (
    <>
      <header>
        <div>
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
              <ul className="navbar-ul">
                {routes.map((item, index) => {
                  return (
                    <li key={index} className="links-li">
                      <Link to={item.path}>{capitalize(item.path)}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
