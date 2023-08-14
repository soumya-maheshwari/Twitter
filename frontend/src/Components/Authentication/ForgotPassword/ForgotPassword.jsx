import React, { useState } from "react";
import forgotImg from "../../../Assets/login.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "./forgotPassword.css";
import { forgotPasswordThunk } from "../../../Redux/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sm = useSelector((state) => state.auth);
  console.log(sm);

  const [email, setEmail] = useState("");

  const handleSendOTP = (e) => {
    e.preventDefault();

    dispatch(forgotPasswordThunk({ email }))
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };

  return (
    <>
      <div className="container-forgot">
        <div className="left">
          <img src={forgotImg} className="forgot-img" alt="forgot password ?" />
        </div>

        <div className="form-forgot">
          <h1 className="forgot-head">Forgot Password?</h1>
          <p className="forgot-text">We will send a OTP to your Email .</p>
          <form action="" className="form-class" onSubmit={handleSendOTP}>
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
            <button type="submit" className="forgot-btn">
              Send OTP
            </button>{" "}
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
