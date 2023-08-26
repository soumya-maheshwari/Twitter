export const getSenderName = (loggedUser, users) => {
  console.log((loggedUser.user._id, "loggeduser"));
  console.log(users[0], "users");
  return users[0]?._id === loggedUser.id ? users[1].name : users[0].name;
};

export const getSenderUserName = (loggedUser, users) => {
  console.log((loggedUser.user._id, "loggeduser"));
  console.log(users[0], "users");
  return users[0]?._id === loggedUser.id
    ? users[1].username
    : users[0].username;
};

export const getFullSenderDetails = (loggedUser, users) => {
  return users[0]._id === loggedUser.user._id ? users[1] : users[0];
};
