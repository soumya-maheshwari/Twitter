import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./bookmark.css";
import { useDispatch } from "react-redux";
import { getAllBookmarkThunk } from "../../Redux/profileSlice";

const Bookmarks = () => {
  const dispatch = useDispatch();

  const [bookmarks, setBookmarks] = useState();

  useEffect(() => {
    dispatch(getAllBookmarkThunk())
      .then((res) => {
        console.log(res);
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
      </div>
    </>
  );
};

export default Bookmarks;
