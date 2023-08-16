import React from "react";
import "./profilepage.css";
import Sidebar from "../Sidebar/Sidebar";
import avatarImg from "../../Assets/avatar.svg";

const Profilepage = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user);

  return (
    <>
      <div className="profile-head">
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
                <p className="count">{user.user.no_of_posts.length}</p>
                <p className="count">{user.user.followers.length}</p>
                <p className="count">{user.user.following.length}</p>
              </div>
            </div>
          </div>

          <div className="profile3">
            <p className="profile-info1">{user.user.name}</p>
            <p className="profile-info2">{user.user.email}</p>
            <p className="profile-info3">@{user.user.username}</p>
            <p className="profile-info4">bio</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profilepage;
