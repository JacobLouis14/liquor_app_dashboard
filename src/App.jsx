import React, { useEffect, useState } from "react";
import Sidebar from "./components/common/SideBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Appbar from "./components/common/Appbar";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import State from "./pages/State";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/Auth";
import { useSelector } from "react-redux";
import LoginRedirector from "./components/common/LoginRedirector";

function App() {
  const [sideBarShow, setSideBarShow] = useState(false);
  const [token, setToken] = useState("");
  const location = useLocation();
  const { data } = useSelector((state) => state.authReducer);

  const sideBArToggleHandler = () => {
    setSideBarShow(!sideBarShow);
  };

  useEffect(() => {
    setToken(localStorage.getItem("userToken"));
  }, [data]);

  // login routes
  if (location.pathname === "/") {
    return (
      <>
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
        <ToastContainer />
      </>
    );
  }

  // Main Routes
  return (
    <>
      {token && data ? (
        <div className="app">
          <Sidebar
            sideBarShow={sideBarShow}
            sideBArToggleHandler={sideBArToggleHandler}
          />
          <div className="mainContainer">
            <Appbar sideBArToggleHandler={sideBArToggleHandler} />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/product" element={<Product />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/users" element={<Users />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/states" element={<State />} />
            </Routes>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <LoginRedirector />
      )}
    </>
  );
}

export default App;
