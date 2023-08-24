import React from "react";
import "./bookmark.css";
import { useDispatch } from "react-redux";
import cross from "../../Assets/cross.svg";
import cross2 from "../../Assets/cross2.svg";
import { removeBookmarkThunk } from "../../Redux/postSlice";
import { ToastContainer, toast } from "react-toastify";
import menu from "../../Assets/menuIcon.svg";
import { useNavigate } from "react-router-dom";
const BookMarkPosts = (props) => {
  const postid = props.postid;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMouseOver = () => {
    document.getElementById("crosss").src = cross2;
  };

  const handleMouseLeave = () => {
    document.getElementById("crosss").src = cross;
  };

  const handleRemoveBookmark = () => {
    dispatch(removeBookmarkThunk({ postid }))
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
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.reponse;
      });
  };

  const handleNavigate = () => {
    navigate(`/otherProfile/${props.username}`);
  };
  return (
    <>
      <div className="post-box-bookmark">
        <div className="box1-bookmark">
          <img
            src={cross}
            alt=""
            className="crosss-icon"
            id="crosss"
            // onMouseOver={handleMouseOver}
            // onMouseLeave={handleMouseLeave}
            onClick={handleRemoveBookmark}
          />
          <p className="post-box-name-bookmark">{props.name}</p>
          <p className="post-box-username-bookmark" onClick={handleNavigate}>
            @{props.username}
          </p>
        </div>
        <img src={props.image} alt="image" className="bookmark-image" />
        <p className="post-texts-bookmark">{props.content}</p>
        {/* <img src="" alt="" /> */}
        {/* <video src=""></video> */}
      </div>
      <ToastContainer />
    </>
  );
};

export default BookMarkPosts;
