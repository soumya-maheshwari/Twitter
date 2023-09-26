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
import searchImg2 from "../../Assets/search2.svg";
import cross from "../../Assets/cross.svg";
import logoutImg from "../../Assets/logout.svg";

import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  // console.log(location);
  // console.log(isActive);
  const navigate = useNavigate();

  const hideMenu = () => {
    navigate("/homePage");
  };

  const handleCreate = () => {
    navigate("/HomePage");
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
          <Link to="/homePage" style={{ textDecoration: "none" }}>
            {" "}
            <li className="list-item">
              <img
                src={isActive("/homePage") ? homeImg2 : homeImg}
                alt="home"
                className="home-icon"
                id="home-icon"
              />
              <span id={isActive("/homePage") ? "home-name2" : "home-name"}>
                Home
              </span>
            </li>
          </Link>
          <Link to="/search" style={{ textDecoration: "none" }}>
            <li className="list-item">
              <img
                src={isActive("/search") ? searchImg2 : searchImg}
                alt=""
                className="search-icon-list"
                id="search-icon"
              />

              <span
                className={isActive("/search") ? "search-name2" : "search-name"}
              >
                Search
              </span>
            </li>{" "}
          </Link>
          <Link to="/notifications" style={{ textDecoration: "none" }}>
            <li className="list-item">
              <img
                src={isActive("/notifications") ? bell2Img : bellImg}
                alt=""
                className="bell-icon"
                id="bell-icon"
              />

              <span
                className={
                  isActive("/notifications") ? "bell-name2" : "bell-name"
                }
              >
                Notifications
              </span>
            </li>{" "}
          </Link>
          <Link to="/bookmarks" style={{ textDecoration: "none" }}>
            <li className="list-item">
              <img
                src={isActive("/bookmarks") ? bookmark2Img : bookmarkImg}
                alt=""
                className="bookmark-icon"
                id="bookmark-icon"
              />
              <span
                className={
                  isActive("/bookmarks") ? "bookmarks-name2" : "bookmarks-name"
                }
              >
                Bookmarks
              </span>
            </li>{" "}
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li className="list-item">
              <img
                src={isActive("/profile") ? profile2Img : profileImg}
                alt=""
                className="profile-icon"
                id="profile-icon"
              />

              <span
                className={
                  isActive("/profile") ? "profile-name2" : "profile-name"
                }
              >
                Profile
              </span>
            </li>{" "}
          </Link>
          <Link to="/messages" style={{ textDecoration: "none" }}>
            <li className="list-item">
              <img
                src={isActive("/messages") ? message2Img : messageImg}
                alt=""
                className="message-icon"
                id="message-icon"
              />
              <span
                className={
                  isActive("/messages") ? "message-name2" : "message-name"
                }
              >
                Messages
              </span>
            </li>
          </Link>
          <li className="list-item">
            <button
              type="submit"
              className="create-post-btn"
              onClick={handleCreate}
            >
              Create
            </button>
          </li>
          <Link to="/logout" style={{ textDecoration: "none" }}>
            <li className="list-item-logout">
              <img
                src={logoutImg}
                alt="Log Out"
                className="logoutt-icon"
                id="logoutt-icon"
              />
              <span className="logout-name">Log Out</span>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
