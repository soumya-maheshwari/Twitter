import React from "react";
import "./bookmark.css";

const BookMarkPosts = (props) => {
  return (
    <>
      <div className="post-box-bookmark">
        <div className="box1-bookmark">
          <p className="post-box-name-bookmark">{props.name}</p>
          <p className="post-box-username-bookmark">@{props.username}</p>
        </div>

        <p className="post-texts-bookmark">{props.content}</p>
        {/* <img src="" alt="" /> */}
        {/* <video src=""></video> */}
      </div>
    </>
  );
};

export default BookMarkPosts;
