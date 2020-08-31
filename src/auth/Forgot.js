import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Layout from "../layouts/Layout";

const initialState = {
  email: "",
  buttonText: "Request Password Change",
};

const Forgot = ({ history }) => {
  const [values, setValues] = useState(initialState);

  //disStructured so i can use the values dynamically
  const { email, buttonText } = values;

  const inputChange = (name) => (event) => {
    //console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Sending Password Link" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_BACKEND_URL}forgot-password`,
      data: { email },
    })
      .then((response) => {
        console.log("FORGOT PASSWORD SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Updated" });
      })
      .catch((error) => {
        console.log("FORGOT PASSWORD ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "Try Again 😒" });
      });
  };

  const passwordForgotForm = () => {
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
        <h1 className="p-5 text-center">Forgot Password</h1>
        <ToastContainer />
        {passwordForgotForm()}
      </div>
    </Layout>
  );
};
export default Forgot;
