import React, { useState } from "react";
import "./login.css";
import loginImg from "../../../Assets/login.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="container-login">
        <div className="left">
          <img src={loginImg} className="login-img" alt="" />
        </div>

        <div className="form-login">
          <h1 className="login-head">Welcome back</h1>
          <form action="" className="form-class">
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
                type="password"
                className="input-field"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>{" "}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
