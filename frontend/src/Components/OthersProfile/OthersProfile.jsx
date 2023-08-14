import React from "react";
import avatarImg from "../../Assets/avatar.svg";
import "./othersProfile.css";

const OthersProfile = (props) => {
  return (
    <>
      <div className="other-profile-page">
        <div className="other-profile-body">
          <img src={avatarImg} alt="" className="other-user-img" />
          <div className="other-profile-div">
            <div className="other-profile1">
              <p className="other-posts">Posts</p>
              <p className="other-posts">Followers</p>
              <p className="other-posts">Following</p>
            </div>

            <div className="other-profile2">
              <p className="other-count">9</p>
              <p className="other-count">1</p>
              <p className="other-count">1</p>
            </div>
          </div>
        </div>

        <div className="other-profile3">
          <p className="other-profile-info1">{props.name}</p>
          <p className="other-profile-info3">@{props.username}</p>
          <p className="other-profile-info4">bio</p>
        </div>
      </div>
    </>
  );
};

export default OthersProfile;
