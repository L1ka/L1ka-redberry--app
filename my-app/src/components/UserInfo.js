import React from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";

import MainHeader from "./MainHeader";

export default function UserInfo() {
  const getFormValues = function () {
    const storedValues = localStorage.getItem("save--onType--user");
    if (!storedValues) {
      return {
        name: "",
        surname: "",
        team_id: "",
        position_id: "",
        email: "",
        phone_number: "",
        token: "3c404d1821d9eb1f73df1b483c347bae",
      };
    }

    return JSON.parse(storedValues);
  };

  const [formValues, setFormValues] = React.useState(getFormValues);
  const [formErrors, setFormErrors] = React.useState({});

  React.useEffect(() => {
    localStorage.setItem("save--onType--user", JSON.stringify(formValues));
  }, [formValues]);

  const handleValueChange = function (e) {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

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

  const navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault();

    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  React.useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      navigate("/laptopinfo");
    }
  });

  const validate = (values) => {
    const errors = {};
    const email = new RegExp("[a-z0-9]+@redberry.ge");
    const georgian = new RegExp(/^[ა-ჰ]+$/);
    const phone_number = new RegExp(/^\+995(?:[0-9] ?){8}[0-9]$/);

    if (!values.name) {
      errors.name = "სავალდებულო ველი!";
    } else if (values.name.length < 2) {
      errors.name = "სავალდებულოა მინიმუმ 2 სიმბოლო!";
    } else if (!georgian.test(values.name)) {
      errors.name = "გამოიყენეთ ქართული ასოები";
      console.log(errors);
    }
    if (!values.surname) {
      errors.surname = "სავალდებულო ველი!";
    } else if (values.surname.length < 2) {
      errors.surname = "სავალდებულოა მინიმუმ 2 სიმბოლო!";
    } else if (!values.surname.match(georgian)) {
      errors.surname = "გამოიყენეთ ქართული ასოები";
    }
    if (!values.team_id) errors.team_id = true;
    if (!values.position_id) errors.position_id = true;

    if (!values.email) {
      errors.email = "სავალდებულო ველი!";
    } else if (!values.email.match(email)) {
      errors.email = "მეილი არ აკმაყოფილებს ფორმატს!";
    }

    if (!values.phone_number) {
      errors.phone_number = "სავალდებულო ველი!";
    } else if (!values.phone_number.match(phone_number)) {
      errors.phone_number = "ნომერი არ აკმაყოფილებს ფორმატს!";
    }

    return errors;
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
      <img className="footer--image" src="../images/LOGO-10 2.svg"></img>
    </div>
  );
}
