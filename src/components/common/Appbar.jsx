import React, { useState } from "react";
import "./Appbar.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch } from "react-redux";
import { logOutHandler } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Appbar({ sideBArToggleHandler }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout handler
  const logOutController = () => {
    dispatch(logOutHandler());
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <button className="sidebar-toggle" onClick={sideBArToggleHandler}>
        ☰
      </button>
      <div className="navbarMenuContainer">
        <button id="notificationButton">
          <NotificationsIcon />
        </button>
        <button className="btn btn-danger" onClick={logOutController}>
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default Appbar;
