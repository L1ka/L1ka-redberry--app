import React from "react";
import { useNavigate } from "react-router-dom";

import MainHeader from "./MainHeader";

export default function UserInfo() {

  };
  const [formValues, setFormValues] = React.useState();
  const [formErrors, setFormErrors] = React.useState({});

  const [team, setTeam] = React.useState([]);
  const [position, setPosition] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://pcfy.redberryinternship.ge/api/teams");
      const { data } = await res.json();

      setTeam(data);
    };
    getData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "https://pcfy.redberryinternship.ge/api/positions"
      );
      const { data } = await res.json();

      setPosition(data);
    };
    getData();
  }, []);

  const onChange = function (prop) {
    const { name, value } = prop.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="personal--info--container">
      <MainHeader id="user" handleSubmit={handleSubmit} />
      <form className="form">
        <section
          className={`testimonial section ${formErrors.name ? "error" : ""}`}
        >
          <label className="bold">სახელი</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleValueChange}
          ></input>
          <h5 className="light">
            {formErrors.name
              ? formErrors.name
              : "მინიმუმ 2 სიმბოლო, ქართული ასოები"}
          </h5>
        </section>
        <section
          className={`testimonial section ${formErrors.surname ? "error" : ""}`}
        >
          <label className="bold">გვარი</label>
          <input
            type="text"
            name="surname"
            value={formValues.surname}
            onChange={handleValueChange}
            autoComplete="off"
          ></input>
          <h5 className="light">
            {formErrors.surname
              ? formErrors.surname
              : "მინიმუმ 2 სიმბოლო, ქართული ასოები"}
          </h5>
        </section>
        <section className="testimonial">
          <DropDown
            name="team_id"           
            onChange={onChange}
            data={team}
            data2={position}
            title="თიმი"
            formErrors={formErrors}
            id="team_id"
          />
        </section>
        <section className={` testimonial ${formErrors.email ? "error" : ""}`}>
          <label className="bold">მეილი</label>
          <input
            type="text"
            className="email"
            name="email"
            autoComplete="off"
            value={formValues.email}
            onChange={handleValueChange}
          ></input>
          <h5 className="light">
            {formErrors.email
              ? formErrors.email
              : "უნდა მთავრდებოდეს @redberry.ge-ით"}
          </h5>
        </section>
        <section
          className={`testimonial  ${formErrors.phone_number ? "error" : ""}`}
        >
          <label className="bold">ტელეფონის ნომერი</label>
          <input
            type="text"
            className="phone_number"
            name="phone_number"
            value={formValues.phone_number}
            onChange={handleValueChange}
            autoComplete="off"
          ></input>
          <h5>
            {formErrors.phone_number
              ? formErrors.phone_number
              : "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს"}
          </h5>
        </section>
        <section className="testimonial button">
          <button type="subbmit" className="personal--info--next--btn">
            შემდეგი
          </button>
        </section>
      </form>
    </div>
  );
}
