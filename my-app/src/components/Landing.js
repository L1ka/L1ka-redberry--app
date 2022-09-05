import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const onSubmit = function (e) {
    e.preventDefault();
    navigate("/userinfo");
  };

  const handleClick = function (e) {
    e.preventDefault();
    navigate("/listpage");
  };
  return (
    <div className="landing--page">
      <img className="redberry--logo" src="../images/LOGO-02 1.svg"></img>
      <img className="landing--image" src="../images/Frame.svg"></img>
      <img
        className="landing--image--mobile"
        src="../images/landing image mobile.svg"
      ></img>
      <button type="button" onClick={onSubmit} className="landing--add--button">
        ჩანაწერის დამატება
      </button>

      <button onClick={handleClick} className="landing--list--button">
        ჩანაწერების სია
      </button>
    </div>
  );
}
