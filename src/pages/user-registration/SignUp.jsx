import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./signInSignUp.css";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../utils/getOrSetLocalStorageData";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { useState } from "react";
import DialogueBox from "../dialogue-box/DialogueBox";

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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signUpForm = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { register, handleSubmit, formState } = signUpForm;
  const { errors } = formState;

  const onSubmit = (data) => {
    const contactData =
      getLocalStorageData("contactData") === null
        ? []
        : getLocalStorageData("contactData");
    let isExistingEmail = false;
    console.log("bool", isExistingEmail);
    contactData.filter((contact) => {
      if (contact.email === data.email && contact.password === data.password) {
        isExistingEmail = true;
      }
    });
    console.log("bool", isExistingEmail);
    if (!isExistingEmail) {
      delete data.confirmPassword;
      setLocalStorageData("contactData", [...contactData, data]), 1000;
      navigate("/");
    } else {
      handleShow();
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Sign Up</h1>
      </div>
      <div className="login-body">
        <DialogueBox
          show={show}
          handleClose={handleClose}
          closeBtnTxt={"Close"}
          showConfirmBtn={false}
        >
          Email already exists! Login Instead or try using another email!
        </DialogueBox>
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
            <Button variant="outline-primary" type="submit">
              Sign Up
            </Button>
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
