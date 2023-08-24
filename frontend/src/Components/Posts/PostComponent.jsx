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
import { addCommentThunk } from "../../Redux/commentSlice";

const PostComponent = (props) => {
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [comment_text, setCommmentText] = useState("");
  // console.log(props);
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

  const userData = {
    comment_text: comment_text,
    userid: userid,
    postid: postid,
  };
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

  const openCommentBox = () => {
    setIsCommentBoxOpen(true);
  };

  const addComment = () => {
    if (!comment_text) {
      toast.error(`Enter something to comment`, {
        position: "top-right",
        theme: "dark",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    dispatch(addCommentThunk(userData))
      .then((res) => {
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
          setIsCommentBoxOpen(false);
        } else {
          toast.error(`unable to comment on the post`, {
            position: "top-right",
            theme: "dark",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        console.log(res);
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
        <img src={props.image} alt="image" className="post-img" />
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
              onClick={openCommentBox}
            />
            <p className="likes-count">0</p>
            <div className="comment-box">
              {isCommentBoxOpen && (
                <div className="comment-input">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment_text}
                    onChange={(e) => setCommmentText(e.target.value)}
                  />
                  <button onClick={addComment}>Comment</button>
                </div>
              )}
            </div>
          </div>
          {/* <div className="comment-box">
            {isCommentBoxOpen && (
              <div className="comment-input">
                <input type="text" placeholder="Add a comment..." />
                <button>Submit</button>
              </div>
            )}
          </div> */}
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
