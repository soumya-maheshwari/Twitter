import React, { useEffect, useState } from "react";
import "./Messages.css";
import Sidebar from "../Sidebar/Sidebar";
import SearchToChat from "./Search/SearchToChat";
import { useDispatch, useSelector } from "react-redux";
import { getAllChatsThunk } from "../../Redux/chatSlice";
import { getSenderName, getSenderUserName } from "../../Config/Helper";
import sendImg from "../../Assets/send.svg";
import {
  getAllMessagesThunk,
  sendMessageThunk,
} from "../../Redux/messageSlice";
import ScrollableChatFeeds from "./ScrollableChatFeeds";

const Messages = () => {
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState(null);
  const [content, setContent] = useState("");
  const [chats, setChats] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user);

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
  const msg = useSelector((state) => state.message);

  useEffect(() => {
    if (msg.isSuccess) {
      setAllMessages(msg.messagesArray);
      // setMessageToSend("");
      // socket.emit("join a chat", chatid);

      // setLoading(false);
    }
  }, [msg]);
  const userData = {
    content: content,
    chatId: selectedChat ? selectedChat._id : "",
  };

  const userData2 = {
    chatId: selectedChat ? selectedChat._id : "",
  };

  const handleSend = () => {
    if (!selectedChat) {
      dispatch(sendMessageThunk(userData))
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err.response;
        });
    }
  };

  // console.log(selectedChat, "selected chat");

  useEffect(() => {
    // if (selectedChat) {
    dispatch(getAllMessagesThunk(userData2))
      .then((res) => {
        console.log(res.payload.data.messages);
        // setAllMessages(res.payload.data.messages);
        console.log(res);
        // console.log(allMessages);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
    // }
  });
  return (
    <>
      <div className="message-page">
        <Sidebar />
        <div className="message-box-body">
          <div className="message-box">
            {selectedChat ? (
              <>
                <div className="chat-box">
                  <p className="sender-heading">
                    {getSenderName(user, selectedChat.users)}
                  </p>
                  <div className="messages">
                    <ScrollableChatFeeds allMessages={allMessages} />
                  </div>
                  bhjbjt
                </div>
              </>
            ) : (
              <>
                <p className="chat-text">Click on a user to start chatting</p>

                {/* <div className="messages">
                  <ScrollableChatFeeds allMessages={allMessages} />
                </div> */}
              </>
            )}

            <div className="send-input-msg">
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input-msg"
                placeholder="Enter a message"
              />
              <img
                src={sendImg}
                alt=""
                className="send-img"
                onClick={handleSend}
              />
            </div>
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
                      style={{
                        backgroundColor: `${
                          selectedChat === chat ? "#494fde" : "indianred"
                        }`,
                      }}
                      bgcolor={selectedChat === chat ? "#494fde" : "#fafcfc"}
                      onClick={() => setSelectedChat(chat)}
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
