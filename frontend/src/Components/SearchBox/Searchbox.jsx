import React from "react";
import searchImg from "../../Assets/search.svg";

const Searchbox = () => {
  return (
    <>
      <div className="search-comp">
        <img src={searchImg} alt="" />
        <input type="text" className="input-field-class" />
      </div>
    </>
  );
};

export default Searchbox;
