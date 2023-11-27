import { useEffect } from "react";
import "../stylesheet/Dashboard.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
export default function Dashboard() {
  const { userEmail } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail === "") {
      navigate("/");
    } else {
      if (sessionStorage.getItem("userSession") !== userEmail) {
        console.log("user exist ?", false);
        navigate("/");
      }
    }
  }, [navigate, userEmail]);

  const contactForm = useForm();
  const { register, control, handleSubmit, formState } = contactForm;
  const { errors } = formState;
  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  return (
    <div className="contact-container">
      <div className="modal-popup">
        <div className="close-btn">
          <button
            className="btn btn-secondary modal-close"
            onClick={() => {
              document.querySelector(".modal-popup").style.display = "none";
            }}
          >
            &times;
          </button>
        </div>
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2>Add Contact</h2>
          <div className="form-group mb-1">
            <label className="form-label" htmlFor="contact-name">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              id="contact-name"
              {...register("contactName", {
                required: "Name is required",
              })}
            />
            <span className="text-danger">{errors.contactName?.message}</span>
          </div>
          <div className="form-group mb-1">
            <label className="form-label" htmlFor="contact-email">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              id="contact-email"
              {...register("contactEmail", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9. !#$%&'*+/=?^_`{|}~−]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            <span className="text-danger">{errors.contactEmail?.message}</span>
          </div>
          <div className="form-group mb-1">
            <label className="form-label" htmlFor="contact-number">
              Phone Number
            </label>
            <input
              className="form-control"
              type="tel"
              id="contact-number"
              {...register("contactPhone", {
                required: "Phone number is required",
              })}
            />
            <span className="text-danger">{errors.contactPhone?.message}</span>
          </div>
          <div className="form-group mb-1">
            <label className="form-label" htmlFor="contact-image">
              Upload Picture
            </label>
            <input
              className="form-control required"
              type="file"
              id="contact-image"
              {...register("contactImage")}
            />
            <span className="text-danger">{errors.contactImage?.message}</span>
          </div>
          <div className="form-group mt-3">
            <input
              className="btn btn-primary"
              type="submit"
              value="Add Contact"
            />
          </div>
        </form>
        <DevTool control={control} />
      </div>
      <div className="contact-panel">
        <div className="search-section">
          <input
            type="text"
            placeholder="&#128270; Search"
            className="search-bar mx-auto "
          />
          <input
            type="button"
            value="New"
            className="btn btn-primary mx-auto"
            onClick={() => {
              document.querySelector(".modal-popup").style.display = "block";
            }}
          />
        </div>
        <div className="display-content"></div>
      </div>
      <div className="contact-body"></div>
    </div>
  );
}
// https://www.youtube.com/watch?v=zv-TOLKTlR8&list=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s&index=13
