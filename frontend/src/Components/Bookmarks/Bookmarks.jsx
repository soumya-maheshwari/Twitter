import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./bookmark.css";
import { useDispatch } from "react-redux";
import { getAllBookmarkThunk } from "../../Redux/profileSlice";
import BookMarkPosts from "./BookMarkPosts";
import menuImg from "../../Assets/menuIcon.svg";
import { useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState();
  const showMenu = () => {
    navigate("/sidebar");
  };

  useEffect(() => {
    dispatch(getAllBookmarkThunk())
      .then((res) => {
        // console.log(res);
        setBookmarks(res.payload.data.bookmarks);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  });

  return (
    <>
      <div className="bookmark-page">
        <Sidebar />
        <div className="all-bookmarks">
          <img
            src={menuImg}
            alt="menu"
            className="menu-icon-home"
            id="menu2"
            onClick={showMenu}
          />

          <h1 className="head-b home-head">Bookmarked Posts</h1>
          {bookmarks &&
            bookmarks.map((post) => {
              return (
                // <></>
                <>
                  <BookMarkPosts
                    content={post.content}
                    name={post.user.name}
                    username={post.user.username}
                    postid={post._id}
                    key={post._id}
                    no_of_likes={post.likes.length}
                    image={post.image}
                    // isLike={post.likes.includes(userid)}
                  />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
