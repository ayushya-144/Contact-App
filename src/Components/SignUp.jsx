import { useState } from "react";

export default function SignUp() {
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [data, setData] = useState([]);
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
    setData(JSON.parse(localStorage.getItem("contactData")));
    const result = handleValidation();
    if (result) {
      delete inputVal.confirmPassword;
      console.log(inputVal);
      localStorage.setItem("contactData", JSON.stringify([...data, inputVal]));
    }
  };
  const handleValidation = () => {
    const { email, password, confirmPassword } = inputVal;
    for (let i = 0; i < inputVal.length; i++) {
      console.log(inputVal[i]);
      if (inputVal[i].email === email) {
        alert("this is email is already in use login instead");
      }
    }
    if (email === "") {
      alert("email field is required");
    } else if (!email.includes("@")) {
      alert("enter valid email");
    } else if (password === "") {
      alert("enter valid password");
    } else if (password.length < 8) {
      alert("password length cannot be less than 8 characters");
    } else if (confirmPassword !== password) {
      alert("Confirm Password do not match with current password");
    } else {
      return true;
    }
  };
  return (
    <div className="login-container">
      <div>
        <p>Sign Up</p>
      </div>
      <div>
        <form>
          <div>
            <input
              type="text"
              name="email"
              onChange={handleGetData}
              placeholder="Email Address"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              onChange={handleGetData}
              placeholder="Password"
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleGetData}
              placeholder="Confirm Password"
            />
          </div>
          <div>
            <input type="submit" onClick={handleAddData} value="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  );
}
// https://www.youtube.com/watch?v=fMTSQ6K_Oh0
