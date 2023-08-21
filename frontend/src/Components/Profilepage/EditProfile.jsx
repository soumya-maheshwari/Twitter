import React, { useEffect, useState } from "react";
import "./profilepage.css";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editProfileThunk, getProfileThunk } from "../../Redux/profileSlice";
import emoji from "../../Assets/emoji.svg";
import avatarImg from "../../Assets/avatar.svg";
import { ToastContainer, toast } from "react-toastify";
import api from "./API";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const username = user.user.username;
  const [remainingCharacters, setRemainingCharacters] = useState(50);
  const [name, setName] = useState("");
  const [editProfileImage, setEditprofileImage] = useState(null);
  const [sendImage, setSendImage] = useState([]);
  const [bio, setBio] = useState("");
  const [pic, setPic] = useState("");
  useEffect(() => {
    dispatch(getProfileThunk(username)).then((res) => {
      console.log(res);
      setName(res.payload.data.profile.name);
      setPic(res.payload.data.profile.profile_pic);
      setBio(res.payload.data.profile.bio);
      console.log(sendImage);

      setSendImage(res.payload.data.profile.profile_pic);
      return res;
    });
  }, [username]);
  const handleUpdateImg = (e) => {
    var profilePic = (document.getElementById("input-profile-img").src =
      URL.createObjectURL(e.target.files[0]));
    setEditprofileImage(URL.createObjectURL(e.target.files[0]));
    setSendImage(e.target.files[0]);
    // document.getElementById("input-profile-img").style.display = "block";
  };

  const userData = {
    pic: sendImage,
    name: name,
    bio: bio,
  };

  console.log(userData);
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  // const avatarImg = `${api}/${sendImage}`;

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editProfileThunk(userData))
      .then((res) => {
        console.log(res);
        if (res.payload.data.success) {
          toast.success(`${res.payload.data.msg}`, {
            position: "top-right",
            theme: "dark",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(`${"Some error occured in updating the profile"}`, {
            position: "top-right",
            // theme: "DARK",
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
        return err.response;
      });
  };

  const handleBioChange = (e) => {
    const inputValue = e.target.value;
    const charactersLeft = 50 - inputValue.length;
    setRemainingCharacters(charactersLeft);
    setBio(inputValue);
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
          <p className="edit-name">Bio</p>
          <div className="edit-name-text">
            <input
              type="text"
              className="edit-name-input"
              value={bio}
              onChange={handleBioChange}
            />
            {/* <img src={emoji} alt="" className="emoji-icon2" /> */}
            {/* <div className="character-count">{remainingCharacters} / 50</div> */}
          </div>
          <div className="character-count">{remainingCharacters} / 50</div>
          <button type="submit" className="yes" onClick={handleEdit}>
            Edit
          </button>
          <button type="submit" className="no" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditProfile;
