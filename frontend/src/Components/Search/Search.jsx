import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./search.css";
import SearchUsers from "../Homepage/SearchUsers/SearchUsers";
import menuImg from "../../Assets/menuIcon.svg";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const showMenu = () => {
    navigate("/sidebar");
  };

  return (
    <>
      <div className="search-page">
        <Sidebar />

        <div className="search-sidebar">
          {/* <h1 className="home-head search-head">SEARCH USERS</h1> */}
          <img
            src={menuImg}
            alt="menu"
            className="menu-icon-home"
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
