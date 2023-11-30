import "./stylesheet/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import ErrorPage from "./Components/ErrorPage";
import { RequiredAuth } from "./utils/RequiredAuth";
import { AuthProvider } from "./utils/auth.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<LogIn />} />
        <Route
          path="/Dashboard"
          element={
            <RequiredAuth>
              <Dashboard />
            </RequiredAuth>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
