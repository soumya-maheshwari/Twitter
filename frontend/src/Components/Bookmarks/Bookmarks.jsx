import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./bookmark.css";
import { useDispatch } from "react-redux";
import { getAllBookmarkThunk } from "../../Redux/profileSlice";
import BookMarkPosts from "./BookMarkPosts";

const Bookmarks = () => {
  const dispatch = useDispatch();

  const [bookmarks, setBookmarks] = useState();

  useEffect(() => {
    dispatch(getAllBookmarkThunk())
      .then((res) => {
        console.log(res);
        setBookmarks(res.payload.data.bookmarks);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  });

  return (
    <>
      <div className="bookmark-page">
        <Sidebar />
        <div className="all-bookmarks">
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
