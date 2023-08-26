import React, { useEffect, useState } from "react";
import "./Messages.css";
import Sidebar from "../Sidebar/Sidebar";
import SearchToChat from "./Search/SearchToChat";
import { useDispatch } from "react-redux";
import { getAllChatsThunk } from "../../Redux/chatSlice";
import {
  getSender,
  getSenderName,
  getSenderUserName,
} from "../../Config/Helper";

const Messages = () => {
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState(null);

  const [chats, setChats] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user);

  useEffect(() => {
    dispatch(getAllChatsThunk())
      .then((res) => {
        console.log(res);
        setChats(res.payload.data.USER);

        // console.log(res.payload.data.USERS);
        console.log(chats);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }, []);
  return (
    <>
      <div className="message-page">
        <Sidebar />
        <div className="message-box-body">
          <div className="message-box">
            {selectedChat ? (
              ""
            ) : (
              <>
                <p className="chat-text">Click on a user to start chatting</p>
              </>
            )}
            {/* <p className="chat-text">Click on a user to start chatting</p> */}
          </div>
        </div>
        <div className="search-users-messages">
          <SearchToChat />
          <h1>MY CHATS</h1>
          {chats &&
            chats.map((chat) => {
              return (
                <>
                  <div className="all-chats">
                    <div
                      className="all-chat"
                      //  onClick={setSelectedChat(chat.users)}
                    >
                      <p className="sender">
                        {getSenderName(user, chat.users)}
                      </p>

                      <p className="sender-username">
                        @{getSenderUserName(user, chat.users)}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Messages;
