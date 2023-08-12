import React, { useState } from "react";
import signupImg from "../../../Assets/signup.svg";
import "./signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleShowHide = () => {
    setShow(!show);
  };
  const handleShowHide2 = () => {
    setShow2(!show2);
  };

  return (
    <>
      <div className="container-signup">
        <div className="left">
          <img src={signupImg} className="signup-img" alt="" />
        </div>

        <div className="form-signup">
          <h1 className="signup-head">Register</h1>
          <form action="" className="form-class">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Full Name
              </label>{" "}
              <input
                type="text"
                value={fullname}
                className="input-field"
                name="email"
                required
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>{" "}
              <input
                type="text"
                value={email}
                className="input-field"
                id="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  User Name
                </label>{" "}
                <input
                  type="text"
                  value={username}
                  className="input-field"
                  name="name"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Password
              </label>{" "}
              <input
                type={show ? "text" : "password"}
                className="input-field"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {show ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="eyeimg"
                  onClick={handleShowHide}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={handleShowHide}
                  className="eyeimg"
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Confirm Password
              </label>{" "}
              <input
                type={show ? "text" : "password"}
                className="input-field"
                name="password"
                required
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
            {show ? (
              <FontAwesomeIcon
                icon={faEye}
                className="eyeimg"
                onClick={handleShowHide}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={handleShowHide}
                className="eyeimg"
              />
            )}
            <button type="submit" className="signup-btn">
              Signup
            </button>{" "}
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
