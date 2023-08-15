import React from "react";
import "./posts.css";
import likeImg from "../../Assets/like.svg";
import { useDispatch } from "react-redux";
import { likePostThunk } from "../../Redux/postSlice";
import { ToastContainer, toast } from "react-toastify";
import like2 from "../../Assets/like2.svg";

const PostComponent = (props) => {
  const postid = props.postid;
  const dispatch = useDispatch();
  const handleLikePost = () => {
    dispatch(likePostThunk({ postid }))
      .then((res) => {
        console.log(res);
        if (res.payload.data.success) {
          document.getElementsByClassName("like-icon").src = like2;
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
          // toast.error(`${res.payload.data.msg}`, {
          //   position: "top-right",
          //   theme: "dark",
          //   autoClose: 3000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          // });
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };
  return (
    <>
      <div className="post-box">
        <div className="box1">
          <p className="post-box-name">{props.name}</p>
          <p className="post-box-username">@{props.username}</p>
        </div>
        <p className="post-texts">{props.content}</p>
        {/* <img src="" alt="" /> */}
        {/* <video src=""></video> */}
        <img
          src={likeImg}
          alt=""
          className="like-icon"
          onClick={handleLikePost}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default PostComponent;
