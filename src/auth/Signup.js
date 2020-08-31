import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Layout from "../layouts/Layout";
import { isAuth } from "./cookieHelper";

const initialState = {
  name: "",
  email: "",
  password: "",
  buttonText: "Sign Up",
};

const Signup = () => {
  const [values, setValues] = useState(initialState);

  //disStructured so i can use the values dynamically
  const { name, email, password, buttonText } = values;

  const inputChange = (name) => (event) => {
    //console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log("Signup Success", response);
        //this will reset the form values to empty when the data has been successfully saved
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted 👍",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("Signup Error", error.response.data); //error.respose.data (this respond with the error message from the data)
        setValues({ ...values, buttonText: "Try Again 😒" });
        toast.error(error.response.data.error);
      });
  };

  const SignUpForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            value={name}
            onChange={inputChange("name")}
            type="text"
            className="form-control"
          />
        </div>
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
          <label className="text-muted">Password</label>
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
        <h1 className="p-3 text-center">SignUp</h1>
        <hr />
        <ToastContainer />
        {/* get the user info from isAuth()  then used the ternary operator if a user info is gotten then redirect to home*/}
        {isAuth() ? <Redirect to="/" /> : null}
        {/* {JSON.stringify({ name, email, password })} */}
        {SignUpForm()}
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
export default Signup;
