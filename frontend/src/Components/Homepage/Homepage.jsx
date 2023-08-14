import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./homepage.css";
import CreatePost from "../Homepage/CreatePost/CreatePost";
import SearchUsers from "./SearchUsers/SearchUsers";

const Homepage = () => {
  return (
    <>
      <Sidebar />
      <div className="home-page">
        <div className="home-center">
          <div className="home-head">Home</div>
          <CreatePost />
        </div>

        <div className="home-right">
          <div className="home-center">
            <div className="home-head">Search Users</div>
            <SearchUsers />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
