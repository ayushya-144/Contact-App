import "./stylesheet/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./Components/NavigationBar";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import NavbarHandler from "./Components/NavbarHandler";
import ErrorPage from "./Components/ErrorPage";

function App() {
  return (
    <>
      <NavbarHandler>
        <NavigationBar />
      </NavbarHandler>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<LogIn />} />
        <Route path="/Dashboard/:userEmail" element={<Dashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
