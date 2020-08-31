import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import { isAuth, signout } from "../auth/cookieHelper";

const Layout = ({ children, match, history }) => {
  const isActive = (path) => {
    if (match.path === path) {
      return { color: "#888B8D" };
    } else {
      return { color: "#D9D9D6" };
    }
  };

  const nav = () => {
    return (
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link to="/" className=" nav-link" style={isActive("/")}>
            Home
          </Link>
        </li>
        {/* this will hide the signin and signUp page when the user has been logged in  */}
        {!isAuth() && (
          <Fragment>
            <li className="nav-item">
              <Link
                to="/signin"
                className=" nav-link"
                style={isActive("/signin")}
              >
                SignIn
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className=" nav-link"
                style={isActive("/signup")}
              >
                SignUp
              </Link>
            </li>
          </Fragment>
        )}
        {/* to Show the user name when signed in and make it clickable when the user wants to visit his profile if admin / subscriber*/}
        {isAuth() && isAuth().role === "admin" && (
          <li className="nav-item">
            <Link
              className="nav-link"
              //style={isActive("/admin")}
              style={{ cursor: "pointer", color: "grey" }}
              to="/admin"
            >
              {isAuth().name}
            </Link>
          </li>
        )}
        {/* to Show the user name when signed in and make it clickable when the user wants to visit his profile if admin / subscriber */}
        {isAuth() && isAuth().role === "Subscriber" && (
          <li className="nav-item">
            <Link
              className="nav-link"
              //style={isActive("/private")}
              style={{ cursor: "pointer", color: "green" }}
              to="/private"
            >
              {isAuth().name}
            </Link>
          </li>
        )}
        {/* //signout */}
        {isAuth() && (
          <li className="nav-item">
            <span
              style={{ cursor: "pointer", color: "gray" }}
              className="nav-link"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              SignOut
            </span>
          </li>
        )}
      </ul>
    );
  };
  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
