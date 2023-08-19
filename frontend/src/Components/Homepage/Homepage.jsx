import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./homepage.css";
import CreatePost from "../Homepage/CreatePost/CreatePost";
import SearchUsers from "./SearchUsers/SearchUsers";
import HomeFeeds from "./HomeFeeds";
import logoutImg from "../../Assets/logout.svg";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };
  return (
    <>
      <Sidebar />
      <div className="home-page">
        <div className="home-center">
          <div className="home-head">Home</div>
          <CreatePost />
          <HomeFeeds />
        </div>

        <div className="home-right">
          <div className="home-center">
            {/* <div className="home-head">Search Users</div> */}
            {/* <SearchUsers /> */}
            <img
              src={logoutImg}
              alt="Logout"
              className="logout-icon"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
