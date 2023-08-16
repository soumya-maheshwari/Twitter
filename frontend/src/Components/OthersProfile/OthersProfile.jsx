import React, { useEffect, useState } from "react";
import avatarImg from "../../Assets/avatar.svg";
import "./othersProfile.css";
import Profilepage from "../Profilepage/Profilepage";
import { useNavigate, useParams } from "react-router-dom";
import OtherProfileComponent from "./OtherProfileComponent";
import { useDispatch } from "react-redux";
import {
  followUserThunk,
  getProfileThunk,
  unFollowUserThunk,
} from "../../Redux/profileSlice";
import Sidebar from "../Sidebar/Sidebar";
import SearchUsers from "../Homepage/SearchUsers/SearchUsers";
import { ToastContainer, toast } from "react-toastify";

const OthersProfile = (props) => {
  const navigate = useNavigate();
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

  const [selectedUserName, setSelectedUserName] = useState("");
  // const dispatch = useDispatch();

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

  const { username } = useParams();

  console.log(username);

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
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.reponse;
      });
  }, [username]);

  return (
    <>
      <Sidebar />
      <div className="other-profile-page">
        <div className="other-profile-body" onClick={handleClickProfile}>
          <img src={avatarImg} alt="" className="other-user-img" />
          <div className="other-profile-div">
            <div className="other-profile1">
              <p className="other-posts">Posts</p>
              <p className="other-posts">Followers</p>
              <p className="other-posts">Following</p>
            </div>

            <div className="other-profile2">
              <p className="other-count">{posts}</p>
              <p className="other-count">{followers}</p>
              <p className="other-count">{following}</p>
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
            {/* <hr className="linee" /> */}
          </div>
        </div>
        <div className="other-profile3">
          <p className="other-profile-info1">{name}</p>
          <p className="other-profile-info3">@{username}</p>
          <p className="other-profile-info2">{email}</p>

          <p className="other-profile-info4">bio</p>
        </div>
        {/* <hr className="linee" /> */}
        ----------------------------------------------------------
      </div>
      <ToastContainer />
    </>
  );
};

export default OthersProfile;
