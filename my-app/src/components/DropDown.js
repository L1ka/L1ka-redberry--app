import React from "react";

export default function DropDown(prop) {
  const getTeam = function () {
    const storedValues = localStorage.getItem("team");

    if (storedValues === "undefined") return "თიმი";
    return JSON.parse(storedValues);
  };

  const getPosition = function () {
    const storedValues = localStorage.getItem("position");

    if (storedValues === "undefined") return "პოზიცია";
    return JSON.parse(storedValues);
  };

  const getOptions = function () {
    const storedValues = localStorage.getItem("position_options");

    if (storedValues === "undefined") return;
    return JSON.parse(storedValues);
  };

  const [team, setTeam] = React.useState(getTeam);
  const [position, setPosition] = React.useState(getPosition);

  const [positionValue, setPositionValue] = React.useState(getOptions);

  React.useEffect(() => {
    localStorage.setItem("team", JSON.stringify(team));
  }, [team]);

  React.useEffect(() => {
    localStorage.setItem("position", JSON.stringify(position));
  }, [position]);

  React.useEffect(() => {
    localStorage.setItem("position_options", JSON.stringify(positionValue));
  }, [positionValue]);
  return (
    <div>
      <div
        className={`team one    ${
          prop.formErrors.team_id ? "dropdown--error" : ""
        }`}
      >
        <img className="dropdown--arrow" src="../images/down_arrow.svg"></img>

        <select
          onChange={(e) => {
            setTeam(e.target.value);
            setPosition("პოზიცია");

            const some = prop.data2.filter(
              (obj) => e.target.value === `${obj.team_id}`
            );

            setPositionValue(some);

            return prop.onChange(e);
          }}
          className="laptop--brand"
          name="team_id"
          value={team ? team : "თიმი"}
        >
          <option className="bold" style={{ display: "none" }}>
            თიმი
          </option>
          {prop.data.map((obj, i) => (
            <option key={i} value={obj.id}>
              {obj.name}
            </option>
          ))}
        </select>
      </div>
      <div
        className={`team    ${
          prop.formErrors.position_id ? "dropdown--error" : ""
        }`}
      >
        <img className="dropdown--arrow" src="../images/down_arrow.svg"></img>

        <select
          value={position ? position : "პოზიცია"}
          className="laptop--brand"
          name="position_id"
          onChange={(e) => {
            setPosition(e.target.value);
            return prop.onChange(e);
          }}
          onClick={(e) => {
            return !position
              ? (e.target.disabled = true)
              : (e.target.disabled = false);
          }}
        >
          <option className="bold" style={{ display: "none" }}>
            პოზიცია
          </option>
          {positionValue
            ? positionValue.map((obj, i) => (
                <option key={i} id={obj.id} label={obj.name} value={obj.id}>
                  {obj.name}
                </option>
              ))
            : ""}
        </select>
      </div>
    </div>
  );
}
