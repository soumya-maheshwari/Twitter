import React, { useEffect, useState } from "react";
import "./posts.css";
import likeImg from "../../Assets/like.svg";
import { useDispatch } from "react-redux";
import { addToBookmarkThunk, likePostThunk } from "../../Redux/postSlice";
import { ToastContainer, toast } from "react-toastify";
import like2 from "../../Assets/like2.svg";
import commentImg from "../../Assets/comment.svg";
import comment2 from "../../Assets/comment2.svg";
import shareImg from "../../Assets/share.svg";
import share2 from "../../Assets/share2.svg";
import bookImg from "../../Assets/book.svg";
import book2 from "../../Assets/book2.svg";

const PostComponent = (props) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user.accessToken);
  const userid = user.id;
  // console.log(userid);

  const postid = props.postid;
  const dispatch = useDispatch();
  // const [likesARR, setLikesARR] = useState();
  const [isLike, setIsLike] = useState(props.isLike);

  // useEffect(() => {
  //   if (likesARR.includes(userid)) {
  //     setIsLike(true);
  //   }
  // }, [isLike]);
  const handleLikePost = () => {
    dispatch(likePostThunk({ postid }))
      .then((res) => {
        // console.log(res);
        // console.log(postid);
        // setLikesARR(res.payload.data.likedPost.likes);
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
        // console.log(err);
        return err.response;
      });
  };

  const handleAddBookmark = () => {
    dispatch(addToBookmarkThunk({ postid }))
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

  return (
    <>
      <div className="post-box">
        <div className="box1">
          <img
            src={bookImg}
            alt="bookmark"
            className="book-icon"
            id="book-icon"
            onClick={handleAddBookmark}
          />
          <p className="post-box-name">{props.name}</p>
          <p className="post-box-username">@{props.username}</p>
        </div>

        <p className="post-texts">{props.content}</p>
        {/* <img src="" alt="" /> */}
        {/* <video src=""></video> */}

        <div className="imgss">
          <div className="like-div">
            <img
              src={isLike ? like2 : likeImg}
              alt="like"
              className="like-icon"
              onClick={handleLikePost}
              id="like-icon"
            />
            <p className="likes-count">{props.no_of_likes}</p>
          </div>
          <div className="likes-div">
            <img
              src={commentImg}
              alt="comment"
              className="like-icon"
              id="comment-icon"
            />
            <p className="likes-count">0</p>
          </div>
          <div className="likes-div">
            <img
              src={shareImg}
              alt="share"
              className="like-icon"
              id="share-icon"
            />
            <p className="likes-count">0</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PostComponent;
