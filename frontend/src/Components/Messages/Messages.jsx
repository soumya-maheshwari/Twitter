import React from "react";
import "./Messages.css";
import Sidebar from "../Sidebar/Sidebar";
import SearchUsers from "../Homepage/SearchUsers/SearchUsers";
import SearchToChat from "./Search/SearchToChat";

const Messages = () => {
  return (
    <>
      <div className="message-page">
        <Sidebar />
        <div className="message-box-body">
          <div className="message-box">
            <p className="chat-text">Click on a user to start chatting</p>
          </div>
        </div>
        <div className="search-users-messages">
          <SearchToChat />
        </div>
      </div>
    </>
  );
};

export default Messages;
