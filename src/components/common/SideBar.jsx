import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.css";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import PlaceIcon from "@mui/icons-material/Place";

function Sidebar({ sideBarShow, sideBArToggleHandler }) {
  const [isSelected, setIsSelected] = useState(null);
  const location = useLocation();
  const menu = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      page: "/dashboard",
    },
    {
      title: "Product",
      icon: <LocalBarIcon />,
      page: "/product",
    },
    {
      title: "Shop",
      icon: <StorefrontIcon />,
      page: "/shop",
    },
    {
      title: "Users",
      icon: <GroupIcon />,
      page: "/users",
    },
    {
      title: "Categories",
      icon: <CategoryIcon />,
      page: "/categories",
    },
    {
      title: "States",
      icon: <PlaceIcon />,
      page: "/states",
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentIndex = menu.findIndex((item) => item.page === currentPath);
    setIsSelected(currentIndex);
  }, [location.pathname, menu]);

  return (
    <div className={`sidebar ${sideBarShow ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <button
          className={`border-0 bg-transparent float-end ${
            !sideBarShow && "close-btn-hide"
          }`}
          onClick={sideBArToggleHandler}
        >
          <CloseIcon />
        </button>
        <h6>Logo</h6>
      </div>
      <div className="sidebar-content">
        {menu.map((data, index) => (
          <Link key={index} to={data.page}>
            <button
              style={{
                backgroundColor: isSelected === index && "blueviolet",
                color: isSelected === index && "white",
              }}
              className="w-100 mb-2 p-2 text-start btn-menu"
              onClick={sideBarShow ? sideBArToggleHandler : null}
            >
              <span>
                <span className="me-3">{data.icon}</span>
                {data.title}
              </span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
