import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./homepage.css";
import Searchbox from "../SearchBox/Searchbox";
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
      </div>
    </>
  );
};

export default Homepage;
