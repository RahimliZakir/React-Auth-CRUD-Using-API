import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { routes } from "../routes";
import { useCapitalize } from "../hooks/useCapitalize";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const capitalize = useCapitalize();

  const auth = useAuth();

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container align-items-center">
            <div className="col-6">
              <ul className="navbar-ul">
                <li>
                  <NavLink to="/main/trucks">Trucks</NavLink>
                </li>
                {routes.map((item) => {
                  return (
                    <li key={item.path}>
                      <NavLink to={`/main/${item.path}`}>
                        {capitalize(item.path)}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <button
                type="button"
                className="logout-btn"
                onClick={auth.logout}
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
