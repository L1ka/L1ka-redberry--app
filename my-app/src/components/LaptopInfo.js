import React from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "./MainHeader";
import axios from "axios";
export default function LaptopInfo(prop) {
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
