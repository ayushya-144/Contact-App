// import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../stylesheet/SignInSignUp.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Enter a valid email").required("Enter an email"),
  password: yup
    .string()
    .min(8, "Password cannot be less than 8 characters")
    .required("Enter a password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Confirm your password"),
});

export default function SignUp() {
  const navigate = useNavigate();

  const signUpForm = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { register, handleSubmit, formState } = signUpForm;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    const contactData =
      JSON.parse(localStorage.getItem("contactData")) === null
        ? []
        : JSON.parse(localStorage.getItem("contactData"));
    let isExistingEmail = false;
    for (let i = 0; i < contactData.length; i++) {
      if (contactData[i].email === data.email) {
        isExistingEmail = true;
        break;
      }
    }
    if (!isExistingEmail) {
      delete data.confirmPassword;
      localStorage.setItem(
        "contactData",
        JSON.stringify([...contactData, data])
      );
      navigate("/");
    } else {
      alert(
        `${data.email} already exists! Login Instead or try using another email`
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Sign Up</h1>
      </div>
      <div className="login-body">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-input">
            <input
              type="text"
              {...register("email")}
              placeholder="Email Address"
            />
            <span className="validation" id="validate-email">
              {errors.email?.message}
            </span>
          </div>
          <div className="login-input">
            <input
              type="password"
              {...register("password")}
              name="password"
              placeholder="Password"
            />
            <span className="validation" id="validate-password">
              {errors.password?.message}
            </span>
          </div>
          <div className="login-input">
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
            />
            <span className="validation" id="validate-confirmPassword">
              {errors.confirmPassword?.message}
            </span>
          </div>
          <div className="login-input">
            <input type="submit" value="Sign Up" />
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
