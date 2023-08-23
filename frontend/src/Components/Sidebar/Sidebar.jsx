import React from "react";
import "./sidebar.css";
import homeImg from "../../Assets/home.svg";
import bellImg from "../../Assets/bell.svg";
import bookmarkImg from "../../Assets/bookmark.svg";
import profileImg from "../../Assets/profile.svg";
import messageImg from "../../Assets/message.svg";
import homeImg2 from "../../Assets/home2.svg";
import bell2Img from "../../Assets/bell2.svg";
import bookmark2Img from "../../Assets/bookmark2.svg";
import profile2Img from "../../Assets/profile2.svg";
import message2Img from "../../Assets/message2.svg";
import searchImg from "../../Assets/search.svg";
import menuImg from "../../Assets/menuIcon.svg";
import cross from "../../Assets/cross.svg";

import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    document.getElementById("home-icon").src = homeImg2;
    // document.getElementById("list-name").style.color = "rgb(174, 113, 215)";
  };
  const handleBell = () => {
    document.getElementById("bell-icon").src = bell2Img;
    // document.getElementById("bell-name").style.color = "rgb(174, 113, 215)";
  };

  const handleBookmark = () => {
    document.getElementById("bookmark-icon").src = bookmark2Img;
    // document.getElementById("bookmarks-name").style.color =
    //   "rgb(174, 113, 215)";
  };

  const handleProfile = () => {
    document.getElementById("profile-icon").src = profile2Img;
    // document.getElementById("profile-name").style.color = "rgb(174, 113, 215)";
  };

  const handleMessage = () => {
    document.getElementById("message-icon").src = bookmark2Img;
    // document.getElementById("message-name").style.color = "rgb(174, 113, 215)";
  };

  const hideMenu = () => {
    navigate("/homePage");
  };

  return (
    <>
      <div className="sidebar">
        <p className="sidebar-head"></p>
        <img
          src={cross}
          alt="X"
          className="cross-icon"
          id="cross"
          onClick={hideMenu}
        />
        <ul className="lists-item">
          <Link to="/homePage">
            {" "}
            <li
              className="list-item"
              //  onClick={handleHome}
            >
              <img src={homeImg} alt="" className="home-icon" id="home-icon" />
              <span id="home-name">Home</span>
            </li>
          </Link>
          <Link to="/search">
            <li className="list-item" onClick={handleBell}>
              <img
                src={searchImg}
                alt=""
                className="search-icon-list"
                id="search-icon"
              />

              <span className="search-name">Search</span>
            </li>{" "}
          </Link>
          <Link to="/notifications">
            <li className="list-item" onClick={handleBell}>
              <img src={bellImg} alt="" className="bell-icon" id="bell-icon" />

              <span className="bell-name">Notifications</span>
            </li>{" "}
          </Link>
          <Link to="/bookmarks">
            <li className="list-item" onClick={handleBookmark}>
              <img
                src={bookmarkImg}
                alt=""
                className="bookmark-icon"
                id="bookmark-icon"
              />
              <span className="bookmarks-name">Bookmarks</span>
            </li>{" "}
          </Link>
          <Link to="/profile">
            <li className="list-item" onClick={handleProfile}>
              <img
                src={profileImg}
                alt=""
                className="profile-icon"
                id="profile-icon"
              />

              <span className="profile-name">Profile</span>
            </li>{" "}
          </Link>
          {/* <li className="list-item" onClick={handleMessage}>
            <img
              src={messageImg}
              alt=""
              className="message-icon"
              id="message-icon"
            />
            <span className="message-name">Messages</span>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
