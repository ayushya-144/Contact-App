import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/user-registration/SignUp.jsx";
import LogIn from "../pages/user-registration/LogIn.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ErrorPage from "../pages/error-page/ErrorPage.jsx";
import { RequiredAuth } from "../context/RequiredAuth.jsx";
import { AuthProvider } from "../context/auth.jsx";

export default function RoutingPage() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<LogIn />} />
        <Route
          path="/dashboard"
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
