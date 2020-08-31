import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signup from "./auth/Signup";
import SignIn from "./auth/Signin";
import Activate from "./auth/Activate";
import Private from "./layouts/Private";
import PrivateRoute from "./auth/PrivateRoute";
import Admin from "./layouts/Admin";
import AdminRoute from "./auth/AdminRoute";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";

import App from "./App";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/auth/activate/:token" exact component={Activate} />
        <PrivateRoute path="/private" exact component={Private} />
        <AdminRoute path="/admin" exact component={Admin} />
        <Route path="/auth/password/forgot" exact component={Forgot} />
        <Route path="/auth/password/reset/:token" exact component={Reset} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
