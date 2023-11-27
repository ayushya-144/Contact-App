import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function LogIn() {
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleGetData = (e) => {
    const { value, name } = e.target;
    setInputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };
  const handleLoginData = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("contactData"));
    const result = handleValidation();
    if (result) {
      if (userData && userData.length > 0) {
        const userLogin = userData.filter((el) => {
          return (
            el.email === inputVal.email && el.password === inputVal.password
          );
        });
        if (userLogin && userLogin.length > 0) {
          sessionStorage.setItem("userSession", inputVal.email);
          navigate(`/Dashboard/${inputVal.email}`);
        } else {
          alert("Email Id or Password is incorrect");
        }
      }
    }
  };
  const handleValidation = () => {
    const { email, password } = inputVal;
    let result = false;
    if (email === "") {
      handleSpanValidation("email", "Please enter your email address");
    } else if (!email.includes("@")) {
      handleSpanValidation("email", "Please enter a valid email address");
    } else if (password === "") {
      handleSpanValidation("password", "Please enter your password");
    } else if (password.length < 8) {
      handleSpanValidation(
        "password",
        "Password length cannot be less than 8 characters"
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
        <h1>Log In</h1>
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
            <input type="submit" onClick={handleLoginData} value="Log In" />
          </div>
          <div className="login-input">
            <p>
              <i>Already Have an account? </i>
              <NavLink to="/SignUp">Sign Up</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
// https://www.youtube.com/watch?v=fMTSQ6K_Oh0
