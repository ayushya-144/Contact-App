import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../stylesheet/SignInSignUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleGetData = (e) => {
    const { value, name } = e.target;
    setInputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };
  const handleAddData = (e) => {
    e.preventDefault();
    const data =
      JSON.parse(localStorage.getItem("contactData")) === null
        ? []
        : JSON.parse(localStorage.getItem("contactData"));
    const result = handleValidation(data);
    if (result) {
      delete inputVal.confirmPassword;
      // console.log(inputVal);
      localStorage.setItem("contactData", JSON.stringify([...data, inputVal]));
      navigate("/");
    }
  };
  const handleValidation = (data) => {
    const { email, password, confirmPassword } = inputVal;
    let result = false;
    if (data.length && data !== null) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].email == email) {
          alert("this email is already in use!");
          return false;
        }
      }
    }
    if (email === "") {
      handleSpanValidation("email", "email field is required");
    } else if (!email.includes("@")) {
      handleSpanValidation("email", "enter valid email");
    } else if (password === "") {
      handleSpanValidation("password", "enter valid password");
    } else if (password.length < 8) {
      handleSpanValidation(
        "password",
        "password length cannot be less than 8 characters"
      );
    } else if (confirmPassword !== password) {
      handleSpanValidation(
        "confirmPassword",
        "Confirm Password do not match with current password"
      );
    } else {
      result = true;
    }
    return result;
  };

  const handleSpanValidation = (name, validationText) => {
    const elements = document.getElementsByClassName("validation");
    for (let i = 0; i < elements.length; i++) {
      elements[i].innerHTML = "";
      elements[i].style.display = "none";
    }
    document.getElementById(`validate-${name}`).style.display = "block";
    document.getElementById(`validate-${name}`).innerHTML = validationText;
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Sign Up</h1>
      </div>
      <div className="login-body">
        <form className="login-form">
          <div className="login-input">
            <input
              type="text"
              name="email"
              onChange={handleGetData}
              placeholder="Email Address"
            />
            <span className="validation" id="validate-email"></span>
          </div>
          <div className="login-input">
            <input
              type="password"
              name="password"
              onChange={handleGetData}
              placeholder="Password"
            />
            <span className="validation" id="validate-password"></span>
          </div>
          <div className="login-input">
            <input
              type="password"
              name="confirmPassword"
              onChange={handleGetData}
              placeholder="Confirm Password"
            />
            <span className="validation" id="validate-confirmPassword"></span>
          </div>
          <div className="login-input">
            <input type="submit" onClick={handleAddData} value="Sign Up" />
          </div>
          <div className="login-input">
            <p>
              <i>Already Have an account? </i>
              <NavLink to="/">LogIn</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
// https://www.youtube.com/watch?v=fMTSQ6K_Oh0
