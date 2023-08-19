import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./search.css";
import SearchUsers from "../Homepage/SearchUsers/SearchUsers";

const Search = () => {
  return (
    <>
      <div className="search-page">
        <Sidebar />
        <div className="search-sidebar">
          <SearchUsers />
        </div>
      </div>
    </>
  );
};

export default Search;
