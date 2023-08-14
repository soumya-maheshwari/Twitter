import React, { useState } from "react";
import otpImg from "../../../Assets/otp.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "./otpPage.css";

const OtpPage = () => {
  const [otp, setotp] = useState("");

  const handleVerifyOTP = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="container-otp">
        <div className="left">
          <img src={otpImg} className="otp-img" alt="enter otp" />
        </div>

        <div className="form-otp">
          <h1 className="otp-head">OTP Verification</h1>
          <p>Please enter the OTP sent to your email</p>

          <form action="" className="form-class" onSubmit={handleVerifyOTP}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                OTP
              </label>{" "}
              <input
                type="text"
                value={otp}
                className="input-field"
                id="email"
                name="email"
                required
                onChange={(e) => setotp(e.target.value)}
              />
            </div>
            <button type="submit" className="otp-btn">
              Verify
            </button>{" "}
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default OtpPage;
