import React from "react";
import { useNavigate } from "react-router-dom";

import MainHeader from "./MainHeader";

export default function UserInfo() {

  };
  const [formValues, setFormValues] = React.useState();
  const [formErrors, setFormErrors] = React.useState({});

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
      </form>
    </div>
  );
}
