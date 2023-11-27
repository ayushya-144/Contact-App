import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function NavbarHandler({ children }) {
  const [isShowNavBar, setIsShowNavBar] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/SignUp") {
      setIsShowNavBar(false);
    } else {
      setIsShowNavBar(true);
    }
  }, [location]);
  return <div>{isShowNavBar && children}</div>;
}
