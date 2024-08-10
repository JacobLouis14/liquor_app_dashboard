import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLoginApi } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, data, loading, error } = useSelector(
    (state) => state.authReducer
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   onChange form handler
  const formHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  //  submit handler
  const formSubmitHandler = () => {
    const loginData = {
      email: email,
      password: password,
    };
    dispatch(authLoginApi(loginData));
  };

  //   redirection Handler
  const checkForRedirection = () => {
    if (data.IsAdmin && status >= 200 && status < 300) {
      const token = localStorage.getItem("userToken");
      if (token) {
        navigate("/dashboard", { replace: true });
        clearValueHandler();
      }
    }
  };

  //   value clear HAndler
  const clearValueHandler = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    checkForRedirection();
  }, [data]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 p-2">
      <div
        className="shadow rounded-3 p-5 d-flex flex-column align-items-center"
        style={{ width: "450px" }}
      >
        <div
          style={{
            height: "150px",
            width: "150px",
            backgroundColor: "grey",
            borderRadius: "50%",
          }}
          className="mb-5"
        >
          <img
            src="https://png.pngtree.com/png-vector/20220811/ourmid/pngtree-vector-icon-of-a-circular-figure-for-account-and-my-page-buttons-vector-png-image_48048044.jpg"
            alt=""
            className="w-100"
          />
          <h4 className="text-center">Login</h4>
        </div>
        <TextField
          className="mb-3 w-100"
          label="Email"
          variant="outlined"
          name="email"
          value={email || ""}
          placeholder="eg: jonedoe@gmail.com"
          onChange={(e) => formHandler(e)}
        />
        <TextField
          className="mb-3 w-100"
          label="Password"
          variant="outlined"
          name="password"
          value={password || ""}
          type="password"
          onChange={(e) => formHandler(e)}
        />
        <button
          className="d-flex ms-auto btn btn-primary"
          onClick={formSubmitHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Auth;
