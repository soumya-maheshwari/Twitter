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
import EmojiPicker from "emoji-picker-react";
import menuImg from "../../Assets/menuIcon.svg";

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    dispatch(getProfileThunk(username))
      .then((res) => {
        console.log(res);
        setName(res.payload.data.profile.name);
        setPic(res.payload.data.profile.profile_pic);
        setBio(res.payload.data.profile.bio || "");
        setPhoto(res.payload.data.profile.profile_pic);
        console.log(sendImage);

        setSendImage(res.payload.data.profile.profile_pic);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }, [username]);

  console.log(photo);

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
  console.log(editProfileImage);
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

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onClickEmoji = (object, e) => {
    setBio((prevText) => prevText + object.emoji);
    setShowEmojiPicker(false);
  };
  const showMenu = () => {
    navigate("/sidebar");
  };

  return (
    <>
      <div className="edit-profile-pagee">
        <Sidebar />
        <img
          src={menuImg}
          alt="menu"
          className="menu-icon-home"
          id="menu2"
          onClick={showMenu}
        />

        <div className="edit-profile-page">
          {
            editProfileImage ? (
              <>
                <img src={editProfileImage} alt="" className="user-img3" />
              </>
            ) : photo ? (
              <>
                <img src={photo} alt="" className="user-img3" />
              </>
            ) : (
              <>
                <img src={avatarImg} alt="" className="user-img3" />
              </>
            )
            // <img src={avatarImg} alt="" className="user-img3" />
          }
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
                name="profile_pic"
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
              <img
                src={emoji}
                alt=""
                className="emoji-icon2"
                onClick={toggleEmojiPicker}
              />
              {showEmojiPicker ? (
                <div className="emojipicker12">
                  <EmojiPicker
                    theme="dark"
                    width="43vw"
                    height="400px"
                    onEmojiClick={onClickEmoji}
                  />
                </div>
              ) : null}
            </div>
            <div className="character-count">{remainingCharacters} / 50</div>
            <button type="submit" className="yes" onClick={handleEdit}>
              Edit
            </button>
            <button type="submit" className="no noo" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default EditProfile;
