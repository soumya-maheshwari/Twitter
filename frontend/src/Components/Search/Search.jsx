import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./search.css";
import SearchUsers from "../Homepage/SearchUsers/SearchUsers";
import menuImg from "../../Assets/menuIcon.svg";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const showMenu = () => {
    alert("i");
    // navigate("/sidebar");
  };

  return (
    <>
      <div className="search-page">
        <Sidebar />

        <div className="search-sidebar">
          <img
            src={menuImg}
            alt="menu"
            className="menu-icon-search"
            id="menu2"
            onClick={showMenu}
          />
          <SearchUsers />
        </div>
      </div>
    </>
  );
};

export default Search;
