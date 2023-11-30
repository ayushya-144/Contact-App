import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const logIn = (email) => {
    sessionStorage.setItem("userSession", email);
  };
  const logOut = () => {
    if (confirm("Are you sure you want to logout")) {
      sessionStorage.clear();
      navigate("/");
    }
  };
  return (
    <AuthContext.Provider value={{ logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
