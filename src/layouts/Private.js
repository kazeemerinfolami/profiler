import React, { useState, useEffect } from "react";

import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Layout from "../layouts/Layout";
//getCookie is imported because of the token
import { isAuth, getCookie, signout, updateUser } from "../auth/cookieHelper";

const initialState = {
  role: "",
  name: "",
  email: "",
  password: "",
  buttonText: "Update",
};

const Private = ({ history }) => {
  const [values, setValues] = useState(initialState);

  //token can be gotten from the @getCookie
  const token = getCookie("token");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("PROFILE UPDATE", response);
        //this will help to update the authUser profile state automatically from the users database...
        const { role, name, email } = response.data;
        setValues({ ...values, role, name, email });
      })
      .catch((error) => {
        //this error code will occur when there is an authorized error, eg when the token has expired
        console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
        if (error.response.status == 401) {
          signout(() => {
            history.push("/");
          });
        }
      });
  };
  //disStructured so i can use the values dynamically
  const { role, name, email, password, buttonText } = values;

  const inputChange = (name) => (event) => {
    //console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_BACKEND_URL}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { name, password },
    })
      .then((response) => {
        console.log("Private Profile Update Success", response);
        updateUser(response, () => {
          setValues({
            ...values,
            buttonText: "Updated 👍",
          });
          toast.success("Profile Updated Successfully");
        });
      })
      .catch((error) => {
        console.log("Private Profile Update Error", error.response.data); //error.respose.data (this respond with the error message from the data)
        setValues({ ...values, buttonText: "Try Again 🤭" });
        toast.error(error.response.data.error);
      });
  };

  const updateForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Role</label>
          <input
            defaultValue={role}
            type="text"
            className="form-control"
            disabled
          />
        </div>
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
            defaultValue={email}
            type="email"
            className="form-control"
            disabled
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
        <h1 className="pt-3 text-center">Subscriber</h1>
        <p className="lead text-center">Profile Update</p>
        <ToastContainer />
        {updateForm()}
      </div>
    </Layout>
  );
};
export default Private;
