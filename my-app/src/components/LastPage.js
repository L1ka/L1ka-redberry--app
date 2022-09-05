import React from "react";
import { useNavigate } from "react-router-dom";

export default function LastPage(prop) {
  const navigate = useNavigate();
  const handleClick = function (e) {
    e.preventDefault();
    navigate("/listpage");
  };

  const mainPage = function (e) {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="last--page--container">
      <div className="last--page--frame">
        <img src="../images/congrat image.svg"></img>
        <h1 className="last--page--title bold">ჩანაწერი დამატებულია!</h1>
        <button onClick={handleClick} className="btn--for--list">
          სიაში გადაყვანა
        </button>
        <p onClick={mainPage} className="btn--for--landing">
          მთავარი
        </p>
      </div>
    </div>
  );
}
