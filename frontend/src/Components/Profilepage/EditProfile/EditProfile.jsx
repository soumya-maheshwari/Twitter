import React, { useState } from "react";
import "./editprofile.css";

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user);

  const [name, setName] = useState(user.user.name);
  const [bio, setBio] = useState(user.user.bio);
  const [username, setUsername] = useState(user.user.username);
  return (
    <>
      <div className="edit-profile">
        <p>
          <img className="editImage" />
        </p>
        <form action="">
          <label htmlFor="">
            <p className="edit-profile-text">Edit profile photo</p>
          </label>
          <input
            type="file"
            // hidden
            accept="image/png, image/jpg, image/jpeg"
            onChange={() => {}}
          />

          <p className="edit-name">Name</p>
          <div className="div1">
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <p className="edit-name">Bio</p>
          <div className="div2">
            <input
              type="text"
              placeholder="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="div3">
            <input
              type="text"
              placeholder="user name"
              value={`@${username}`}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
