import React, { useState } from "react";
import "./profilepage.css";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editProfileThunk } from "../../Redux/profileSlice";
import emoji from "../../Assets/emoji.svg";
import avatarImg from "../../Assets/avatar.svg";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [name, setName] = useState(user.user.name);
  const [username, setUsername] = useState(user.user.username);
  const [editProfileImage, setEditprofileImage] = useState(null);
  const [sendImage, setSendImage] = useState([]);
  const [bio, setBio] = useState("");

  const handleUpdateImg = (e) => {
    var profilePic = (document.getElementById("input-profile-img").src =
      URL.createObjectURL(e.target.files[0]));
    setEditprofileImage(URL.createObjectURL(e.target.files[0]));
    setSendImage(e.target.files[0]);
    // document.getElementById("input-profile-img").style.display = "block";
  };

  const userData = {
    pic: sendImage,
  };

  console.log(userData);
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editProfileThunk(userData))
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };
  return (
    <>
      <Sidebar />
      <div className="edit-profile-page">
        {editProfileImage ? (
          <>
            <img src={editProfileImage} alt="" className="user-img3" />
          </>
        ) : (
          <img src={avatarImg} alt="" className="user-img3" />
        )}
        <p>
          <img id="editProfileImg" />
        </p>
        <form action="">
          <label>
            <p className="edit-img-text">Edit profile Pic</p>{" "}
            <input
              type="file"
              id="input-profile-img"
              accept="image/png, image/jpg, image/jpeg"
              hidden
              onChange={handleUpdateImg}
            />
          </label>
          <p className="edit-name">Name</p>
          <div className="edit-name-text">
            <input
              type="text"
              className="edit-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <p className="edit-name">Username</p>
          <div className="edit-name-text">
            <input
              type="text"
              className="edit-name-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p className="edit-name">Bio</p>
          <div className="edit-name-text">
            <input
              type="text"
              className="edit-name-input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <img src={emoji} alt="" className="emoji-icon2" />
          </div>
          <button type="submit" className="yes" onClick={handleEdit}>
            Edit
          </button>
          <button type="submit" className="no" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
