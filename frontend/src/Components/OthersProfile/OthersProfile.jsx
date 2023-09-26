import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  followUserThunk,
  getProfileThunk,
  unFollowUserThunk,
} from "../../Redux/profileSlice";
import Sidebar from "../Sidebar/Sidebar";
import avatarImg from "../../Assets/avatar.svg";
import "./othersProfile.css";
import { ToastClassName, toast } from "react-toastify";
const OthersProfile = (props) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usernamee, setUsernamee] = useState("");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [posts, setPosts] = useState(0);
  const [userid, setUserid] = useState("");
  const [followed, setIsFollowed] = useState(false);
  const [bio, setBio] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");

  const { username } = useParams();

  console.log(username);
  const handleClickProfile = () => {
    setSelectedUser(props.name);
    setSelectedUserName(props.username);
    // navigate("/otherProfile");
  };

  const userData = {
    userToFollow: userid,
  };

  const userData2 = {
    userToUnfollow: userid,
  };

  const handleFollowUser = () => {
    dispatch(followUserThunk(userData))
      .then((res) => {
        console.log(res);

        if (res.payload.data.success) {
          setIsFollowed(true);
          toast.success(`${res.payload.data.msg}`, {
            position: "top-right",
            // theme: "dark",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.reponse;
      });
  };

  const handleUnfollowUser = () => {
    dispatch(unFollowUserThunk(userData2))
      .then((res) => {
        console.log(res);

        if (res.payload.data.success) {
          setIsFollowed(true);
          toast.success(`${res.payload.data.msg}`, {
            position: "top-right",
            // theme: "dark",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.reponse;
      });
  };

  useEffect(() => {
    dispatch(getProfileThunk(username))
      .then((res) => {
        console.log(res.payload.data.profile);
        if (res.payload.data.success) {
          setName(res.payload.data.profile.name);
          setEmail(res.payload.data.profile.email);
          setUsernamee(res.payload.data.profileusername);
          setFollowers(res.payload.data.profile.followers.length);
          setFollowing(res.payload.data.profile.following.length);
          setPosts(res.payload.data.profile.no_of_posts.length);
          setUserid(res.payload.data.profile._id);
          setBio(res.payload.data.profile.bio);
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.reponse;
      });
  }, [username]);
  return (
    <div className="other-profile-head">
      <Sidebar />

      <div className="other-profile-page">
        <div className="other-profile-body">
          <img src={avatarImg} alt="" className="other-user-img" />

          <div className="other-profile-div">
            <div className="profile1">
              <p className="posts">Posts</p>
              <p className="posts">Followers</p>
              <p className="posts">Following</p>
            </div>

            <div className="profile2">
              <p className="count">{posts}</p>
              <p className="count">{followers}</p>
              <p className="count">{following}</p>
            </div>
            <button
              className="follow-btn"
              type="submit"
              onClick={handleFollowUser}
            >
              {/* {followed ? "Unfollow" : "Follow"} */}
              Follow
            </button>
            {/* <button
              className="follow-btn"
              type="submit"
              onClick={handleUnfollowUser}
            >
              Unfollow
            </button> */}
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
  );
};

export default OthersProfile;
