import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header(prop) {
  const navigate = useNavigate();

  const handleClick = function (e) {
    prop.id === "list" ? navigate("/") : navigate("/listpage");
  };

  return (
    <div className="header">
      <img
        onClick={handleClick}
        className="prev--btn"
        src="../images/Group 4.svg"
      ></img>
      <img
        onClick={handleClick}
        className="prev--btn--mobile"
        src="../images/mobile arrow.svg"
      ></img>
      <div>
        <h1 className="bold">{prop.title}</h1>
      </div>
    </div>
  );
}
