import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import jwt from "jsonwebtoken";

import Layout from "../layouts/Layout";

import "react-toastify/dist/ReactToastify.min.css";

const initialState = {
  name: "",
  token: "",
  show: "true",
};

const Activate = ({ match }) => {
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  //disStructured so i can use the values dynamically
  const { name, token, show } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}account-activation`,
      data: { token },
    })
      .then((response) => {
        console.log("Account Activation", response);
        //this will reset the form values to empty when the data has been successfully saved
        setValues({
          ...values,
          show: "false ",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("Account Activation Error", error.response.data.error); //error.respose.data (this respond with the error message from the data)
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => {
    return (
      <div className="text-center">
        <h1 className="p-5">Hello {name}, Activate your account</h1>
        <button className="btn btn-outline-dark" onClick={clickSubmit}>
          Activate
        </button>
      </div>
    );
  };

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {/* {JSON.stringify({ name, email, password })} */}
        {activationLink()}
      </div>
    </Layout>
  );
};
export default Activate;
