import { Navigate } from "react-router-dom";

export const RequiredAuth = ({ children }) => {
  const loggedInUser = sessionStorage.getItem("userSession");
  if (loggedInUser === null) {
    return <Navigate to="/"></Navigate>;
  }
  return <>{children}</>;
};
