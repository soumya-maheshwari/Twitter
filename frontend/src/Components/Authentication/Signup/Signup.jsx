import React, { useState } from "react";
import signupImg from "../../../Assets/signup.svg";
import "./signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { registerUserThunk } from "../../../Redux/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sm = useSelector((state) => state.auth);
  // console.log(sm);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleShowHide = () => {
    setShow(!show);
  };
  const handleShowHide2 = () => {
    setShow2(!show2);
  };

  const userData = {
    name,
    email,
    password,
    username,
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(registerUserThunk(userData))
      .then((res) => {
        // console.log(res);
        if (res.payload.data.success) {
          toast.success(`${res.payload.data.msg}`, {
            position: "top-right",
            // theme: "dark",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          // setTimeout(() => {
          //   navigate("/");
          // }, 3000);

          localStorage.setItem("userInfo", JSON.stringify(sm.profile));
        } else {
          toast.error(`${res.payload.data.msg}`, {
            position: "top-right",
            // theme: "DARK",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.reponse;
      });
  };
  return (
    <>
      <div className="container-signup">
        <div className="left">
          <img src={signupImg} className="signup-img" alt="" />
        </div>

        <div className="form-signup">
          <h1 className="signup-head">Register</h1>
          <form action="" className="form-class2" onSubmit={handleSignup}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Full Name
              </label>{" "}
              <input
                type="text"
                value={name}
                className="input-fieldd"
                name="email"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>{" "}
              <input
                type="text"
                value={email}
                className="input-fieldd"
                id="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                User Name
              </label>{" "}
              <input
                type="text"
                value={username}
                className="input-fieldd"
                name="name"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Password
              </label>{" "}
              <input
                type={show ? "text" : "password"}
                className="input-fieldd"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {show ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="eyeimg2"
                  onClick={handleShowHide}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={handleShowHide}
                  className="eyeimg2"
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Confirm Password
              </label>{" "}
              <input
                type={show2 ? "text" : "password"}
                className="input-fieldd"
                name="password"
                required
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              {show2 ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="eyeimg2"
                  onClick={handleShowHide2}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={handleShowHide2}
                  className="eyeimg2"
                />
              )}
            </div>
            <button type="submit" className="signup-btn">
              Signup
            </button>{" "}
            <p className="texttt">
              Already have an account?
              <span className="linkk">
                <Link to="/">LOGIN</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
