import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Enter an email").required("Email is required"),
  password: yup.string().required("Enter your password"),
});

export default function LogIn() {
  const navigate = useNavigate();

  const logInForm = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = logInForm;
  const { errors } = formState;

  const onSubmit = (data) => {
    const userData = JSON.parse(localStorage.getItem("contactData"));
    if (userData && userData.length > 0) {
      const userLogin = userData.filter((el) => {
        return el.email === data.email && el.password === data.password;
      });
      if (userLogin && userLogin.length > 0) {
        sessionStorage.setItem("userSession", data.email);
        navigate(`/Dashboard`);
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
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-input">
            <input
              type="text"
              name="email"
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
              name="password"
              {...register("password")}
              placeholder="Password"
            />
            <span className="validation" id="validate-password">
              {errors.password?.message}
            </span>
          </div>
          <div className="login-input">
            <input type="submit" value="Log In" />
          </div>
          <div className="login-input">
            <p>
              <i>Don&apos;t have an account? </i>
              <NavLink to="/SignUp">Sign Up</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
// https://www.youtube.com/watch?v=fMTSQ6K_Oh0
