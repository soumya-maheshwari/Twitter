import React, { useState } from "react";
import OthersProfile from "../../OthersProfile/OthersProfile";

const SearchUserComponent = (props) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");

  const handleUserClick = () => {
    setSelectedUser(props.name);
    setSelectedUserName(props.username);
  };
  console.log(selectedUser);
  console.log(selectedUserName);

  const handleLeave = () => {
    setSelectedUser("");
    setSelectedUserName("");
  };
  return (
    <>
      <div
        className="search-result"
        onMouseOver={handleUserClick}
        onMouseLeave={handleLeave}
      >
        <div className="boxs">
          <p className="search-user-name">{props.name}</p>
          <p className="search-user-username">@{props.username}</p>
          <hr className="linee" />
        </div>
        {selectedUser && selectedUserName && (
          <OthersProfile name={selectedUser} username={selectedUserName} />
        )}
      </div>
    </>
  );
};

export default SearchUserComponent;
