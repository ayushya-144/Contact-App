// import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../stylesheet/SignInSignUp.css";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <FloatingLabel label="Email address" className="mb-3">
              <Form.Control
                type="text"
                {...register("email")}
                placeholder="Email Address"
              />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Password" className="mb-3">
              <Form.Control
                type="password"
                {...register("password")}
                name="password"
                placeholder="Password"
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Confirm Password" className="mb-3">
              <Form.Control
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
              />
              <Form.Text className="text-danger">
                {errors.confirmPassword?.message}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3 login-input">
            <input className="btn-submit" type="submit" value="Sign Up" />
          </Form.Group>
          <div className="login-input">
            <p>
              <i>Already Have an account? </i>
              <NavLink to="/">LogIn</NavLink>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
// https://www.youtube.com/watch?v=fMTSQ6K_Oh0
