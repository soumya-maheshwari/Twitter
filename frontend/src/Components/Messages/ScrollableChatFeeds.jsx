import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../Config/Helper";

const ScrollableChatFeeds = ({ allMessages }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user);
  console.log(allMessages);

  return (
    <>
      <div className="scrollable-chat-feeds">
        <ScrollableFeed>
          {allMessages &&
            allMessages.map((m, i) => {
              return (
                <>
                  <div key={m._id} style={{ display: "flex" }}>
                    {/* {isSameSender(allMessages, m, i, user.id) ||
                      isLastMessage(allMessages, i, user.id)} */}
                    <span
                      style={{
                        borderRadius: "20px",
                        padding: "5px 15px",
                        maxWidth: "75%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: `${
                          m.sender._id === user.id ? "#e1a0eb" : "#B9F5D0"
                        }`,

                        marginLeft: isSameSenderMargin(
                          allMessages,
                          m,
                          i,
                          user.id
                        ),
                        marginTop: isSameUser(allMessages, m, i, user.id)
                          ? 3
                          : 10,
                        color: "black",
                      }}
                    >
                      {m.content}
                    </span>
                  </div>
                </>
              );
            })}
        </ScrollableFeed>
      </div>
    </>
  );
};

export default ScrollableChatFeeds;
