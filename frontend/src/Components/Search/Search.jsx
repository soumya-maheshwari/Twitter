import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./search.css";
import SearchUsers from "../Homepage/SearchUsers/SearchUsers";
const Search = () => {
  return (
    <>
      <Sidebar />
      <div className="search-sidebar">
        <SearchUsers />
      </div>
    </>
  );
};

export default Search;
