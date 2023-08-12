import React, { useState, useEffect } from "react";
import "./login.css";
import loginImg from "../../../Assets/login.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../../Redux/authSlice";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sm = useSelector((state) => state.auth);
  console.log(sm);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowHide = () => {
    setShow(!show);
  };

  const userData = {
    email,
    password,
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUserThunk(userData))
      .then((res) => {
        console.log(res);
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
        console.log(err);
        return err.reponse;
      });
  };

  return (
    <>
      <div className="container-login">
        <div className="left">
          <img src={loginImg} className="login-img" alt="" />
        </div>

        <div className="form-login">
          <h1 className="login-head">Welcome back</h1>
          <form action="" className="form-class" onSubmit={handleLogin}>
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
            <button type="submit" className="login-btn">
              Login
            </button>{" "}
            <p className="textt">
              Don't have an account?
              <span className="link">
                <Link to="/signup">SIGNUP</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
