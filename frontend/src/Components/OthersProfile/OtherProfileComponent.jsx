import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import avatarImg from "../../Assets/avatar.svg";
import "./othersProfile.css";

const OtherProfileComponent = () => {
  return (
    <>
      <div className="profile-head2">
        {/* <Sidebar /> */}

        <div className="profile-page2">
          <div className="profile-body2">
            {/*  */}

            <img src={avatarImg} alt="" className="user-img2" />
            <div className="profile-div2">
              <div className="profile12">
                <p className="posts2">Posts</p>
                <p className="posts2">Followers</p>
                <p className="posts2">Following</p>
              </div>

              <div className="profile22">
                <p className="count2">9</p>
                <p className="count2">1</p>
                <p className="count2">1</p>
              </div>
              <button
                className="follow-btn"
                type="submit"
                //  onClick={handleUnfollowUser}
              >
                Follow
              </button>
            </div>
          </div>

          <div className="profile32">
            <p className="profile-info12">NAME</p>
            <p className="profile-info32">@USERNAME</p>
            <p className="profile-info42">bio</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherProfileComponent;
