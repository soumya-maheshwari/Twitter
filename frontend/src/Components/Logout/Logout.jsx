import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Homepage from "../Homepage/Homepage";
import "./logout.css";
import LogoutImg from "../../Assets/bye.svg";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clearing the entire local storage
    localStorage.clear();
    navigate("/");
  };

  const handleCancelLogout = () => {
    navigate("/homePage");
  };
  return (
    <>
      <Sidebar />

      <div className="container-logout">
        <div className="left">
          <img src={LogoutImg} className="logout-img" alt="logout password ?" />
        </div>

        <div className="right">
          <p className="logout-text">Are you sure you want to logout?</p>
          <button className="yes" onClick={handleLogout}>
            YES
          </button>
          <button className="no" onClick={handleCancelLogout}>
            NO
          </button>
        </div>
      </div>
    </>
  );
};

export default Logout;
