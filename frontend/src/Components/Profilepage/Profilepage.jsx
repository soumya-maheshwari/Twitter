import React from "react";
import "./profilepage.css";
import Sidebar from "../Sidebar/Sidebar";
import avatarImg from "../../Assets/avatar.svg";

const Profilepage = () => {
  return (
    <>
      <Sidebar />
      <div className="profile-page">
        <div className="profile-body">
          {/*  */}

          <img src={avatarImg} alt="" className="user-img" />
          <div className="profile-div">
            <div className="profile1">
              <p className="posts">Posts</p>
              <p className="posts">Followers</p>
              <p className="posts">Following</p>
            </div>

            <div className="profile2">
              <p className="count">9</p>
              <p className="count">1</p>
              <p className="count">1</p>
            </div>
          </div>
        </div>

        <div className="profile3">
          <p className="profile-info1">name</p>
          <p className="profile-info2">email</p>
          <p className="profile-info3">@username</p>
          <p className="profile-info4">bio</p>
        </div>
      </div>
    </>
  );
};

export default Profilepage;
