//here we create our own private route so only the logged in user/ auth user can view this page
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "./cookieHelper";

const PrivateRoute = ({ Component: component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
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
export default PrivateRoute;
// this servers as a route @ component Routes
