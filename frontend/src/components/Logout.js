import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Logout = (props) => {
  // const setPopup = useContext(AuthContext);
  const { logoutUser, setPopup } = useContext(AuthContext);
  useEffect(() => {
    logoutUser()
    localStorage.removeItem("token");
    localStorage.removeItem("type");

    setPopup({
      open: true,
      severity: "success",
      message: "Logged out successfully",
    });
  }, []);
  return <Navigate to="/login" />;
};

export default Logout;