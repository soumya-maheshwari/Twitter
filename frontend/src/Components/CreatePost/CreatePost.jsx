import React, { useState } from "react";
import "./createpost.css";
import image from "../../Assets/image.svg";
import vdeo from "../../Assets/vdeo.svg";
import { useDispatch } from "react-redux";
import { createPostThunk } from "../../Redux/postSlice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [uploadImg, setUploadImg] = useState(null);
  const [uploadVdeo, setUploadVdeo] = useState(null);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user);

  const userData = {
    content,
    uploadImg,
    uploadVdeo,
  };
  const handleCreatePost = (e) => {
    e.preventDefault();
    dispatch(createPostThunk(userData))
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };

  const handleUploadImage = (e) => {
    setUploadImg(e.target.files[0]);
    alert(e.target.files[0]);
  };
  const handleUploadVideo = (e) => {
    setUploadVdeo(e.target.files[0]);
    alert(e.target.files[0]);
  };
  return (
    <>
      <div className="create-post">
        <div className="create-post-div1">
          <div className="create-post-div">
            <p className="user-name">{user.user.name}</p>
            <p className="username">@{user.user.username}</p>
          </div>
        </div>

        <form action="">
          <div className="create-post-text">
            <p className="post-text">Share something with your followers</p>

            <div className="input-post">
              <input
                type="text"
                className="write-post-text"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
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
            <button
              type="submit"
              className="create-btn"
              onClick={handleCreatePost}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
