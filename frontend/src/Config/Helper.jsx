export const getSenderName = (loggedUser, users) => {
  // console.log((loggedUser.user._id, "loggeduser"));
  // console.log(users[0], "users");
  return users[0]?._id === loggedUser.id ? users[1].name : users[0].name;
};

export const getSenderUserName = (loggedUser, users) => {
  // console.log((loggedUser.user._idCD , "loggeduser"));
  // console.log(users[0], "users");
  return users[0]?._id === loggedUser.id
    ? users[1].username
    : users[0].username;
};

export const getFullSenderDetails = (loggedUser, users) => {
  return users[0]._id === loggedUser.user._id ? users[1] : users[0];
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i + 1].sender._id !== userId
  ) {
    return 33;
  } else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  ) {
    return 0;
  } else {
    return "auto";
  }
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
