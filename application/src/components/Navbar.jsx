import React from "react";
import { NavLink, Outlet } from "react-router-dom";

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
                <li>
                  <NavLink to="/">Cars</NavLink>
                </li>
                {routes.map((item) => {
                  return (
                    <li key={item.path}>
                      <NavLink to={`/${item.path}`}>
                        {capitalize(item.path)}
                      </NavLink>
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
