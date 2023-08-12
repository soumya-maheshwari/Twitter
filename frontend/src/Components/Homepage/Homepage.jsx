import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./homepage.css";

const Homepage = () => {
  return (
    <>
      <Sidebar />
      <div className="home-page">
        <div className="home-center">
          <div className="home-head">home</div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
