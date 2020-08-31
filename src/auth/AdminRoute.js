//here we create our own private route so only the logged in user and Admin can view this page
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "./cookieHelper";

const AdminRoute = ({ Component: component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() && isAuth().role === "admin" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  ></Route>
);
export default AdminRoute;
// this servers as a route @ component Routes
