import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./homepage.css";
import CreatePost from "../CreatePost/CreatePost";

const Homepage = () => {
  return (
    <>
      <Sidebar />
      <div className="home-page">
        <div className="home-center">
          <div className="home-head">home</div>
          <CreatePost />
        </div>

        <div className="home-right">
          <div className="home-center">
            <div className="home-head">#Trending</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
