import "./stylesheet/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigationbar from "./Components/Navigationbar";
import SignUp from "./Components/SignUp";
// import LogIn from "./Components/LogIn";

function App() {
  return (
    <>
      <Navigationbar />
      {/* <LogIn /> */}
      <SignUp />
    </>
  );
}

export default App;
