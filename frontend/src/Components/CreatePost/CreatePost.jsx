import React from "react";
import "./createpost.css";
const CreatePost = () => {
  return (
    <>
      <div className="create-post">
        <div className="create-post-div1">
          <div className="create-post-div">
            <p className="user-name">name</p>
            <p className="username">@username</p>
          </div>
        </div>

        <form action="">
          <div className="create-post-text">
            <p className="post-text">Share something with your followers</p>

            <div className="input-post">
              <input type="text" className="write-post-text" required />
            </div>
            <button type="submit" className="create-btn">
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
