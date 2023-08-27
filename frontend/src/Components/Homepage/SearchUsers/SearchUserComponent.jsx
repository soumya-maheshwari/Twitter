import React, { useState } from "react";
import OthersProfile from "../../OthersProfile/OthersProfile";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import OtherProfileComponent from "../../OthersProfile/OtherProfileComponent";
import avatarImg from "../../../Assets/avatar.svg";

const SearchUserComponent = (props) => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState("");

  const [selectedUserName, setSelectedUserName] = useState("");

  // console.log(props.username);
  // const userData = {
  //   username: props.username,
  // };
  const handleUserClick = () => {
    setSelectedUser(props.name);
    setSelectedUserName(props.username);
    navigate(`/otherProfile/${props.username}`);
    // console.log(`/otherProfile/${props.username}}`);
  };
  // console.log(selectedUser);
  // console.log(selectedUserName);

  const handleLeave = () => {
    setSelectedUser("");
    setSelectedUserName("");
  };
  return (
    <>
      <div
        className="search-result"
        // onMouseOver={handleUserClick}
        // onMouseLeave={handleLeave}
        onClick={handleUserClick}
      >
        <div className="boxs">
          <img src={avatarImg} alt="avatar" className="user-img-profile" />
          <p className="search-user-name">{props.name}</p>
          <p className="search-user-username">@{props.username}</p>
          <hr className="linee" />
        </div>
        {/* {selectedUser && selectedUserName && (
          // && navigate("/otherProfile")
          <OthersProfile name={selectedUser} username={selectedUserName} />
        )} */}
      </div>
    </>
  );
};

export default SearchUserComponent;
