import React from "react";
import erroImg from "../../Assets/ERROR.svg";
import "./errorpage.css";

const ErrorPage = () => {
  return (
    <>
      <div className="error-page">
        <img src={erroImg} className="error-img" alt="" />
      </div>
    </>
  );
};

export default ErrorPage;
