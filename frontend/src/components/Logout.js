import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SetPopupContext } from "../App";

const Logout = (props) => {
  const setPopup = useContext(SetPopupContext);
  const { logoutUser } = useContext(AuthContext);
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