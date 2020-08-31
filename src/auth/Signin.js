import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Layout from "../layouts/Layout";
import { authenticate, isAuth } from "./cookieHelper";

const initialState = {
  email: "erinfolamibolaji2010@gmail.com",
  password: "123456",
  buttonText: "Sign In",
};

const SignIn = ({ history }) => {
  const [values, setValues] = useState(initialState);

  //disStructured so i can use the values dynamically
  const { email, password, buttonText } = values;

  const inputChange = (name) => (event) => {
    //console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log("SignIn Success", response);
        authenticate(response, () => {
          //this will reset the form values to empty when the data has been successfully saved
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            buttonText: "Submitted",
          });
          //toast.success(`Welcome onBoard 👨‍✈️ ${response.data.user.name}`)
          isAuth() && isAuth().role === "admin"
            ? history.push("/admin")
            : history.push("/private");
        });
      })
      .catch((error) => {
        console.log("SignIn Error"); //error.respose.data (this respond with the error message from the data)
        setValues({ ...values, buttonText: "Try Again 😒" });
        toast.error(error.response.data.error);
      });
  };

  const SignInForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            value={email}
            onChange={inputChange("email")}
            type="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">password</label>
          <input
            value={password}
            onChange={inputChange("password")}
            type="password"
            className="form-control"
          />
        </div>
        <div>
          {/* instead of using (values.buttonText) at the button weve diStructed so it can be easily used  */}
          <button className="btn btn-dark" onClick={clickSubmit}>
            {buttonText}
          </button>
        </div>
      </form>
    );
  };

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <h1 className="p-3 text-center">SignIn</h1>
        <hr />
        <ToastContainer />
        {/* get the user info from isAuth()  then used the ternary operator if a user info is gotten then redirect to home*/}
        {isAuth() ? <Redirect to="/" /> : null}
        {/* {JSON.stringify({ name, email, password })} */}
        {SignInForm()}
        <br />
        <Link
          to="/auth/password/forgot"
          className="btn btn-sm btn-outline-danger offset-md-9"
        >
          Forgot Password
        </Link>
      </div>
    </Layout>
  );
};
export default SignIn;
