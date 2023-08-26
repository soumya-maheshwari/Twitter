import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatarImg from "../../../Assets/avatar.svg";
import msgImg from "../../../Assets/message.svg";
import msg2 from "../../../Assets/message2.svg";
import { useDispatch } from "react-redux";
import { createChatThunk } from "../../../Redux/chatSlice";

const SearchUserComponent = (props) => {
  const navigate = useNavigate();
  const disptah = useDispatch();
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");

  // console.log(props.username);
  // const userData = {
  //   username: props.username,
  // };

  const userId = props.userId;
  // console.log(userId);
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

  const handleMouseOver = () => {
    document.getElementById("msgg").src = msg2;
  };

  const handleMouseLeave = () => {
    document.getElementById("msgg").src = msgImg;
  };

  const handleMessage = () => {
    disptah(createChatThunk({ userId }))
      .then((res) => {
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
      <div
        className="search-result"
        // onMouseOver={handleUserClick}
        // onMouseLeave={handleLeave}
        // onClick={handleUserClick}
      >
        <div className="boxs">
          <div className="ss">
            <img src={avatarImg} alt="avatar" className="user-img-profile" />
            <img
              src={msgImg}
              alt="msg"
              className="msg-imgg"
              onClick={handleMessage}
              id="msgg"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            />
          </div>
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
