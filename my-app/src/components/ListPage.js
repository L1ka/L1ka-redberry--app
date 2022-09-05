import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const getFormData = function () {
  const storedValues = localStorage?.getItem("list");
  console.log(storedValues === "undefined");
  if (!storedValues || storedValues === undefined) return;

  return JSON.parse(storedValues);
};

export default function ListPage({ setState }) {
  const navigate = useNavigate();
  const handleClick = function (e) {
    e.preventDefault();
    setState(e.target.id);
    navigate("/detailedinfo");
  };
  const [laptops, setLaptops] = React.useState(getFormData);
  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "https://pcfy.redberryinternship.ge/api/laptops?token=3c404d1821d9eb1f73df1b483c347bae"
      );
      const { data } = await res.json();
      console.log(data);
      setLaptops(data);
    };
    getData();
  }, []);

  React.useEffect(() => {
    localStorage.setItem("list", JSON.stringify(laptops));
  }, [laptops]);

  const data2 = window.localStorage.getItem("list");
  const data = JSON.parse(data2);

  return (
    <div className="list--page--container">
      <Header title="ჩანაწერების სია" id="list" />
      <div className="list--frame">
        {data.map((obj, i) => {
          return (
            <div key={i} className="list--component">
              <div>
                <img
                  className="laptop--image--for--list"
                  src={`https://pcfy.redberryinternship.ge/${obj.laptop.image}`}
                ></img>
              </div>
              <div className="right--content">
                <p className="bold">
                  {obj.user.name} {obj.user.surname}
                </p>

                <p>{obj.laptop.name}</p>
                <a id={obj.laptop.id} onClick={handleClick}>
                  მეტის ნახვა
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
