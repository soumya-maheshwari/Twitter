import React, { useState } from "react";
import "./createpost.css";
import image from "../../../Assets/image.svg";
import vdeo from "../../../Assets/vdeo.svg";
import { useDispatch } from "react-redux";
import { createPostThunk } from "../../../Redux/postSlice";
import { ToastContainer, toast } from "react-toastify";
import emojiImg from "../../../Assets/emoji.svg";
import PostComponent from "../../Posts/PostComponent";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [uploadImg, setUploadImg] = useState(null);
  const [uploadVdeo, setUploadVdeo] = useState(null);
  const [selectedImgURL, setSelectedImgURL] = useState("");
  const [selectedVdeoURL, setSelectedVdeoURL] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [post, setPost] = useState(false);
  const [postid, setPostid] = useState("");

  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const userData = {
    content,
    uploadImg,
    uploadVdeo,
  };
  const handleCreatePost = (e) => {
    e.preventDefault();

    dispatch(createPostThunk(userData))
      .then((res) => {
        // console.log(res);
        setPostid(res.payload.data.newPost._id);
        setPost(true);
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
          toast.error(`${"Enter text or upload a image or video"}`, {
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
        // console.log(err);
        return err.response;
      });
  };

  const handleUploadImage = (e) => {
    const selectedFile = e.target.files[0];
    setUploadImg(selectedFile);
    setSelectedImgURL(URL.createObjectURL(selectedFile)); // Create a URL for selected image
  };
  const handleUploadVideo = (e) => {
    const selectedFile = e.target.files[0];
    setUploadVdeo(selectedFile);
    setSelectedVdeoURL(URL.createObjectURL(selectedFile)); // Create a URL for selected video
  };
  const onClickEmoji = (object, e) => {
    setContent((prevText) => prevText + object.emoji);
    setShowEmojiPicker(false);
  };

  const handleNavigate = () => {
    navigate("/profile");
  };
  return (
    <>
      <div className="create-post">
        <div className="create-post-div1">
          <div className="create-post-div">
            <p className="user-name">{user.user.name}</p>
            <p
              className="username"
              onClick={handleNavigate}
              style={{
                cursor: "pointer",
              }}
            >
              @{user.user.username}
            </p>
          </div>
        </div>
        <form action="" onSubmit={handleCreatePost}>
          <div className="create-post-text">
            <p className="post-text">Share something with your followers</p>

            <div className="input-post">
              <textarea
                type="text"
                className="write-post-text"
                // required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            {selectedImgURL && (
              <img
                src={selectedImgURL}
                alt="Selected Image"
                className="selected-img"
              />
            )}

            {selectedVdeoURL && (
              <video
                controls
                src={selectedVdeoURL}
                className="selected-video"
              />
            )}
          </div>

          <div className="create-post2">
            <div className="create-imgs">
              <label>
                <img src={image} alt="" className="img-icon" />
                <input
                  type="file"
                  id="upload-img"
                  accept="image/png, image/jpg, image/jpeg"
                  hidden
                  onChange={handleUploadImage}
                />
              </label>
              <p className="image-text">Image</p>
            </div>

            <div className="create-imgs">
              <label>
                <img src={vdeo} alt="" className="vdeo-icon" />

                <input
                  type="file"
                  id="upload-vdeo"
                  accept="video/mp4"
                  hidden
                  onChange={handleUploadVideo}
                />
              </label>
              <p className="video-text">Video</p>
            </div>

            <div className="create-imgs">
              <img
                src={emojiImg}
                alt=""
                className="emoji-icon"
                onClick={toggleEmojiPicker}
              />

              {showEmojiPicker ? (
                <div className="emojipicker1">
                  <EmojiPicker
                    theme="dark"
                    width="30vw"
                    height="300px"
                    onEmojiClick={onClickEmoji}
                  />
                </div>
              ) : null}
              {/* </label> */}
              <p className="emoji-text">Emoji</p>
            </div>
          </div>

          <button type="submit" className="create-btn">
            Create
          </button>
        </form>
      </div>
      {post && (
        <PostComponent
          content={content}
          username={user.user.username}
          name={user.user.name}
          image={selectedImgURL}
          video={selectedVdeoURL}
          postid={postid}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default CreatePost;
