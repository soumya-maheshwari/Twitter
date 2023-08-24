import React, { useEffect, useState } from "react";
import "./profilepage.css";
import Sidebar from "../Sidebar/Sidebar";
import avatarImg from "../../Assets/avatar.svg";
import edit from "../../Assets/edit.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "./API";
import { getProfileThunk } from "../../Redux/profileSlice";

// console.log(api);

import FollowingUsers from "./FollowingUsers";
import PostComponent from "../Posts/PostComponent";
const Profilepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/editProfile");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usernamee, setUsernamee] = useState("");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [posts, setPosts] = useState(0);
  const [userid, setUserid] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [followersARR, setFollowerARR] = useState("");
  const [followingARR, setFollowingARR] = useState("");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user);
  // console.log(user.user.profile_pic);

  const username = user.user.username;
  // console.log(username);

  useEffect(() => {
    dispatch(getProfileThunk(username))
      .then((res) => {
        console.log(res);
        if (res.payload.data.success) {
          setName(res.payload.data.profile.name);
          setEmail(res.payload.data.profile.email);
          setUsernamee(res.payload.data.profileusername);
          setFollowers(res.payload.data.profile.followers.length);
          setFollowing(res.payload.data.profile.following.length);
          setPosts(res.payload.data.profile.no_of_posts.length);
          setUserid(res.payload.data.profile._id);
          setBio(res.payload.data.profile.bio);
          setProfilePic(res.payload.data.profile.profile_pic);
          setFollowerARR(res.payload.data.profile.followers);
          setFollowingARR(res.payload.data.profile.following);
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.reponse;
      });
  }, [username]);

  const profileURL = `${api}${profile_pic}`;

  // console.log(profileURL);

  const showFollowers = () => {
    if (!followersARR) {
      alert("no followers");
    } else {
      return followersARR.map((follower) => {
        return (
          <div
            key={follower._id}
            style={{
              backgroundColor: "red",
            }}
          >
            <p>{follower.username}</p>
            <p>{follower.name}</p>
          </div>
        );
      });
    }
  };

  const showFollowing = () => {
    if (!followingARR) {
      alert("no followers");
    } else {
      console.log(followingARR);
      followingARR.map((following) => {
        return (
          <>
            <div
              key={following._id}
              // className="followimg"
            >
              <p>{following.username}</p>
              <p>{following.name}</p>
            </div>
          </>
        );
      });
    }
  };
  return (
    <>
      <div className="profile-head">
        <Sidebar />

        <div className="profile-page">
          <img
            src={edit}
            className="edit-icon"
            onClick={handleEditProfile}
            alt="Edit"
          />

          <div className="profile-body">
            {/*  */}
            {profile_pic ? (
              <>
                <img src={profileURL} alt="" className="user-img" />
              </>
            ) : (
              <>
                <img src={avatarImg} alt="" className="user-img" />
              </>
            )}

            <div className="profile-div">
              <div className="profile1">
                <p className="posts">Posts</p>
                <p className="posts">Followers</p>
                <p className="posts">Following</p>
              </div>

              <div className="profile2">
                <p className="count">{posts}</p>
                <p
                  className="count"
                  onClick={showFollowers}
                  onMouseOver={showFollowers}
                >
                  {followers}
                </p>
                <p className="count" onClick={showFollowing}>
                  {following}
                </p>
              </div>
            </div>
          </div>

          <div className="profile3">
            <p className="profile-info1">{name}</p>
            <p className="profile-info2">{email}</p>
            <p className="profile-info3">@{username}</p>
            <p className="profile-info4">{bio}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profilepage;
