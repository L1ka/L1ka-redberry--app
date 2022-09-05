import React from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "./MainHeader";
import axios from "axios";
export default function LaptopInfo(prop) {
  const getFormValues = function () {
    const storedValues = localStorage.getItem("save--onType--laptop");
    if (!storedValues)
      return {
        laptop_name: "",
        laptop_image: "",
        laptop_brand_id: "",
        laptop_cpu: "",
        laptop_cpu_cores: "",
        laptop_cpu_threads: "",
        laptop_ram: "",
        laptop_hard_drive_type: "",
        laptop_state: "",
        laptop_purchase_date: "",
        laptop_price: "",
      };
    return JSON.parse(storedValues);
  };
  const [formValues, setFormValues] = React.useState(getFormValues);
  const [formErrors, setFormErrors] = React.useState({});

  React.useEffect(() => {
    localStorage.setItem("save--onType--laptop", JSON.stringify(formValues));
  }, [formValues]);

  const handleValueChange = function (e) {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [brand, setBrand] = React.useState([]);
  const [CPU, setCPU] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://pcfy.redberryinternship.ge/api/brands");
      const { data } = await res.json();

      setBrand(data);
    };
    getData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://pcfy.redberryinternship.ge/api/cpus");
      const { data } = await res.json();

      setCPU(data);
    };
    getData();
  }, []);

  React.useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      navigate("/lastpage");
      console.log(prop);
    }
  }, [formErrors]);

  const userInfoPage = function (e) {
    e.preventDefault();

    navigate("/userinfo");
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    setFormErrors(validate(formValues));

    const fd = new FormData();
    fd.append("laptop_image", baseImage.selectedFile);

    function getFormData(object) {
      Object.keys(object).forEach((key) => fd.append(key, object[key]));
    }

    const userInfo = JSON.parse(localStorage.getItem("save--onType--user"));
    getFormData(formValues);

    getFormData(userInfo);

    axios
      .post("https://pcfy.redberryinternship.ge/api/laptop/create", fd)
      .then((res) => console.log(res));
    console.log(formValues, userInfo);
  };

  React.useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0) {
      window.localStorage.removeItem("save--onType--user");
      window.localStorage.removeItem("save--onType--laptop");
      window.localStorage.removeItem("team");
      window.localStorage.removeItem("position");
      navigate("/lastpage");
    }
  });

  const validate = (values) => {
    const errors = {};
    const symbols = new RegExp("^[A-Za-z0-9!@#$%^&*()_+=]*$");

    // const laptopImage = values.laptop_image;
    console.log(values);
    const number = new RegExp("^[0-9]*$");

    if (!(values.laptop_image || image)) errors.laptop_image = true;

    if (!values.laptop_brand_id) errors.laptop_brand_id = true;
    if (!values.laptop_cpu) errors.laptop_cpu = true;
    //console.log(baseImage.selectedFile.name);
    if (!values.laptop_name) {
      errors.laptop_name = "სავალდებულო ველი";
    } else if (!values.laptop_name.match(symbols)) {
      errors.laptop_name = "არ აკმაყოფილებს ფორმატს";
    }

    if (!values.laptop_cpu_cores) {
      errors.laptop_cpu_cores = "სავალდებულო ველი";
    } else if (!values.laptop_cpu_cores.match(number)) {
      console.log(values.laptop_cpu_cores);
      errors.laptop_cpu_cores = "მხოლოდ ციფრები";
    }

    if (!values.laptop_cpu_threads) {
      errors.laptop_cpu_threads = "სავალდებულო ველი";
    } else if (!values.laptop_cpu_threads.match(number)) {
      errors.laptop_cpu_threads = "მხოლოდ ციფრები";
    }

    if (!values.laptop_ram) {
      errors.laptop_ram = "სავალდებულო ველი";
    } else if (!values.laptop_ram.match(number)) {
      errors.laptop_ram = "მხოლოდ ციფრები";
    }

    if (!values.laptop_hard_drive_type) errors.laptop_hard_drive_type = true;
    if (!values.laptop_state) errors.laptop_state = true;

    if (!values.laptop_price) {
      errors.laptop_price = "სავალდებულო ველი";
    } else if (!values.laptop_price.match(number)) {
      errors.laptop_price = "მხოლოდ ციფრები";
    }

    return errors;
  };

  const [baseImage, setBaseImage] = React.useState({ selectedFile: null });

  const [image, setImage] = React.useState();

  const uploadImage = async function (e) {
    const file = e.target.files[0];
    const image = await convertBase64(file);
    setImage(image);
    setBaseImage({ selectedFile: file });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="personal--info--container">
      <MainHeader id="laptop" />
      <form className="laptop--frame" onSubmit={handleSubmit}>
        <section
          className={`image--upload ${
            formErrors.laptop_image ? "image-parent-error" : ""
          }`}
        >
          {formErrors.laptop_image ? (
            <>
              <img className="error--icon" src="../images/error icon.svg"></img>
              <p className="image--upload--text image-error">
                ჩააგდე ან ატვირთე ლეპტოპის ფოტო
              </p>
              <p className="image--upload--text image-error upload--mobile--text">
                ლეპტოპის ფოტოს ატვირთვა
              </p>
            </>
          ) : (
            <>
              <p className="image--upload--text">
                ჩააგდე ან ატვირთე ლეპტოპის ფოტო
              </p>
              <p className="image--upload--text image-error upload--mobile--text">
                ლეპტოპის ფოტოს ატვირთვა
              </p>
            </>
          )}

          <input
            placeholder="ატვირთე"
            className="file"
            type="file"
            id="file"
            value={formValues.laptop_image}
            name="laptop_image"
            onChange={uploadImage}
          ></input>

          <img
            src={image ? image : ""}
            className={image ? "uploaded_image" : ""}
          />
          <label className="bold" htmlFor="file">
            ატვირთე
          </label>
          <section>
            {image ? (
              <label className="bold add--again" htmlFor="file">
                თავიდან ატვირთე
              </label>
            ) : (
              ""
            )}
          </section>
        </section>
      </form>
    </div>
  );
}
