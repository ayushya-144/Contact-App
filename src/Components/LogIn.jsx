import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { UseAuth } from "../utils/auth";
import { Navigate } from "react-router-dom";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Enter your password"),
});

export default function LogIn() {
  const navigate = useNavigate();
  const auth = UseAuth();

  const logInForm = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  if (sessionStorage.getItem("userSession") != null) {
    return <Navigate to="/Dashboard"></Navigate>;
  }
  sessionStorage.clear();

  const { register, handleSubmit, formState } = logInForm;
  const { errors } = formState;

  const onSubmit = (data) => {
    const userData = JSON.parse(localStorage.getItem("contactData"));
    if (userData && userData.length > 0) {
      const userLogin = userData.filter((el) => {
        return el.email === data.email && el.password === data.password;
      });
      if (userLogin && userLogin.length > 0) {
        auth.logIn(data.email);
        navigate("/Dashboard", { replace: true });
      } else {
        alert("Email Id or Password is incorrect");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Log In</h1>
      </div>
      <div className="login-body">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <FloatingLabel label="Email address" className="mb-3">
              <Form.Control
                type="text"
                name="email"
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
                name="password"
                {...register("password")}
                placeholder="Password"
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3 login-input">
            <input className="btn-submit" type="submit" value="Log In" />
          </Form.Group>
          <div className="login-input">
            <p>
              <i>Don&apos;t have an account? </i>
              <NavLink to="/SignUp">Sign Up</NavLink>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
// https://www.youtube.com/watch?v=fMTSQ6K_Oh0
