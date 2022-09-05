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
}
