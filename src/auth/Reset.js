import React, { useState, useEffect } from "react";
import axios from "axios";
import JWT from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Layout from "../layouts/Layout";

const initialState = {
  name: "",
  token: "",
  newPassword: "",
  buttonText: "Reset Password",
};

const Reset = ({ match }) => {
  //props.match from react router dom
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    let token = match.params.token;
    let { name } = JWT.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  //disStructured so i can use the values dynamically
  const { name, token, newPassword, buttonText } = values;

  const inputChange = (event) => {
    setValues({ ...values, newPassword: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Resetting Password" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_BACKEND_URL}reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log("RESET PASSWORD SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Updated" });
      })
      .catch((error) => {
        console.log("RESET PASSWORD ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "Try Again 🤭" });
      });
  };

  const passwordResetForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted" />
          <input
            value={newPassword}
            onChange={inputChange}
            type="password"
            className="form-control"
            placeholder="Type a new Password"
            required
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
        <h1 className="p-3 text-center">
          Hello {name}, Input your new Password
        </h1>
        <ToastContainer />
        {passwordResetForm()}
      </div>
    </Layout>
  );
};
export default Reset;
