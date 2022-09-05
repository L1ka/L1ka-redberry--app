import React, { cloneElement } from "react";
import Header from "./Header";

export default function DitailedInfo(prop) {
  const [laptops, setLaptops] = React.useState(getFormData);

  React.useEffect(() => {
    const getData = async () => {
      console.log(prop.id);
      const res = await fetch(
        `https://pcfy.redberryinternship.ge/api/laptop/${prop.id}?token=3c404d1821d9eb1f73df1b483c347bae`
      );
      const { data } = await res.json();

      setLaptops(data);
    };
    getData();
  }, []);

  React.useEffect(() => {
    localStorage.setItem("form", JSON.stringify(laptops));
  }, [laptops]);

  return (
    <div className="list--page--container">
      <Header title="ლეპტოპის ინფო" id="full_info" />
      <div className="info--container">
        <div className="element">
          <img
            className="laptop--image"
            src={`https://pcfy.redberryinternship.ge/${laptops.laptop.image}`}
          ></img>
        </div>
        <div className="element middle">
          <p className="test">
            სახელი:<br></br>თიმი:<br></br> პოზიცია:<br></br> მეილი:<br></br>{" "}
            ტელ. ნომერი:
          </p>
          <p className="test2">
            {laptops.user.name}
            <br></br> {laptops.user.team_id}
            <br></br> {laptops.user.position_id}
            <br></br> {laptops.user.email}
            <br></br> {laptops.user.phone_number}
          </p>
        </div>

        <div className="element middle">
          <p className="test">
            ლეპტოპის სახელი:
            <br></br> ლეპტოპის ბრენდი:
            <br></br> RAM:
            <br></br> მეხსიერების ტიპი:
          </p>
          <p className="test2">
            {laptops.laptop.name}
            <br></br> {laptops.laptop.brand_id}
            <br></br> {laptops.laptop.ram}
            <br></br> {laptops.laptop.hard_drive_type}
          </p>
        </div>
        <div className="element middle">
          <p className="test">
            CPU:
            <br></br>
            CPU-ს ბირთვი:
            <br></br>
            CPU-ს ნაკადი:
          </p>
          <p className="test2">
            {laptops.laptop.cpu.name}
            <br></br> {laptops.laptop.cpu.cores}
            <br></br>
            {laptops.laptop.cpu.threads}
          </p>
        </div>

        <div className="element condition">
          <p className="test">
            ლეპტოპის მდგომარეობა:
            <br></br>
            ლეპტოპის ფასი:
            <br></br>
          </p>
          <p className="test2 ">
            {laptops.laptop.state}
            <br></br> {laptops.laptop.price}
          </p>
        </div>
        <div className="element date">
          <p className="test">შეძენის რიცხვი: </p>
          <p className="test2">{laptops.laptop.purchase_date}</p>
        </div>
      </div>
      {/* .................................................... */}
      <div className="mobile--style--container">
        <div className="element">
          <img
            className="laptop--image"
            src={`https://pcfy.redberryinternship.ge/${laptops.laptop.image}`}
          ></img>
        </div>
        <div className="element top">
          <p className="test">
            სახელი:<br></br>თიმი:<br></br> პოზიცია:<br></br> მეილი:<br></br>{" "}
            ტელ. ნომერი:
          </p>
          <p className="test2">
            {laptops.user.name}
            <br></br> {laptops.user.team_id}
            <br></br> {laptops.user.position_id}
            <br></br> {laptops.user.email}
            <br></br> {laptops.user.phone_number}
          </p>
        </div>
        <div className="hr element"></div>
        <div className="element middle">
          <p className="test">
            ლეპტოპის სახელი:
            <br></br> ლეპტოპის ბრენდი:
            <br></br> RAM:
            <br></br> მეხსიერების ტიპი:
            <br></br> CPU:
            <br></br> CPU-ს ბირთვი:
            <br></br> CPU-ს ნაკადი:
          </p>
          <p className="test2">
            {laptops.laptop.name}
            <br></br> {laptops.laptop.brand_id}
            <br></br> {laptops.laptop.ram}
            <br></br> {laptops.laptop.hard_drive_type}
            <br></br> {laptops.laptop.cpu.name}
            <br></br> {laptops.laptop.cpu.cores}
            <br></br> {laptops.laptop.cpu.threads}
          </p>
        </div>
        <div className="hr2 element"></div>
        <div className="element bottom">
          <p className="test">
            მდგომარეობა:
            <br></br> ლეპტოპის ფასი:
            <br></br> შეძენის რიცხვი:
          </p>
          <p className="test2">
            {laptops.laptop.state}
            <br></br> {laptops.laptop.price}
            <br></br> {laptops.laptop.purchase_date}
          </p>
        </div>
      </div>
    </div>
  );
}
