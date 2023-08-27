import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./homepage.css";
import CreatePost from "../Homepage/CreatePost/CreatePost";
import SearchUsers from "./SearchUsers/SearchUsers";
import HomeFeeds from "./HomeFeeds";
import logoutImg from "../../Assets/logout.svg";
import { useNavigate } from "react-router-dom";
import menuImg from "../../Assets/menuIcon.svg";
import cross from "../../Assets/cross.svg";

const Homepage = () => {
  const navigate = useNavigate();

  const showMenu = () => {
    navigate("/sidebar");
  };

  const handleLogout = () => {
    navigate("/logout");
  };
  return (
    <>
      <div className="HOME">
        <Sidebar />

        <div className="home-page">
          <div className="home-center">
            <img
              src={menuImg}
              alt="menu"
              className="menu-icon-home"
              id="menu"
              onClick={showMenu}
            />
            <div className="home-head">Home</div>
            <CreatePost />
            <HomeFeeds />
          </div>

          {/* <div className="home-right">
          <div className="home-center">
            <img
              src={logoutImg}
              alt="Logout"
              className="logout-icon"
              onClick={handleLogout}
            />
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default Homepage;
