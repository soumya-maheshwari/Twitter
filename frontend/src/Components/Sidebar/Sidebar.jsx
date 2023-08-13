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
import { Link } from "react-router-dom";

const Sidebar = () => {
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
  return (
    <>
      {/* <div className="navbar">
        <p className="navbar-head">twitter</p>
        <div className="navbar1">
          <p className="navbar1-head">HOME</p>
        </div>
      </div> */}
      <div className="sidebar">
        <p className="sidebar-head"></p>
        <ul className="lists-item">
          <Link to="/homePage">
            {" "}
            <li className="list-item" onClick={handleHome}>
              <img src={homeImg} alt="" className="list-icon" id="home-icon" />
              <span id="home-name">Home</span>
            </li>
          </Link>
          <li className="list-item" onClick={handleBell}>
            <img src={bellImg} alt="" className="list-icon" id="bell-icon" />

            <span className="bell-name">Notifications</span>
          </li>{" "}
          <li className="list-item" onClick={handleBookmark}>
            <img
              src={bookmarkImg}
              alt=""
              className="list-icon"
              id="bookmark-icon"
            />
            <span className="bookmarks-name">Bookmarks</span>
          </li>{" "}
          <Link to="/profile">
            <li className="list-item" onClick={handleProfile}>
              <img
                src={profileImg}
                alt=""
                className="list-icon"
                id="profile-icon"
              />

              <span className="profile-name">Profile</span>
            </li>{" "}
          </Link>
          <li className="list-item" onClick={handleMessage}>
            <img
              src={messageImg}
              alt=""
              className="list-icon"
              id="message-icon"
            />
            <span className="message-name">Messages</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
