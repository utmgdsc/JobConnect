import { useEffect, useContext } from "react";
import { createContext, useCallback, useState } from "react";
import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [referError, setReferError] = useState(null);
  const [isReferLoading, setIsReferLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    type: "",
    password: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    skills: [],
    experience: [],
    education: [],
    resume:"",
    description:"",
    age: ""
  });
  const [referralInfo, setReferralInfo] = useState({
    name: "",
    email: "",
    relationship: "",
    phone: "",
    description:""
  });

  const [education, setEducation] = useState([
    {
      institution: "",
      degree: "", 
      fieldOfStudy: "", 
      startYear: "",
      endYear: "",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      title: "",
      company: "", 
      description: "", 
      startYear: "",
      endYear: "",
    },
  ]);
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  
  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(user);
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo((prevInfo) => ({
      ...prevInfo,
      ...info,
    }));
  }, []);

  const updateReferralInfo = useCallback((info) => {
    setReferralInfo((prevInfo) => ({
      ...prevInfo,
      ...info,
    }));
  }, []);

  const updateUser = useCallback((response) => {
    localStorage.setItem("token", response.token)
    localStorage.setItem("User", response);
    localStorage.setItem("type", response.type);
    setUser(response);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsRegisterLoading(true);
      setRegisterError(null);
      try {
        let updatedDetails = {
          ...registerInfo,
          education: education
            .filter((obj) => obj.institution.trim() !== "")
            .map((obj) => {
              if (obj["endYear"] === "") {
                delete obj["endYear"];
              }
              return obj;
            }),
            experience: experience
            .filter((obj) => obj.title.trim() !== "")
            .map((obj) => {
              if (obj["endYear"] === "") {
                delete obj["endYear"];
              }
              return obj;
            }),
        };
  
        console.log("UPDATED DETAILS", updatedDetails)
        var response = await (axios.post(apiList.register, updatedDetails))
        setIsRegisterLoading(false);
        if (response.error) {
          return setRegisterError(response);
        }
        let user = response.data

        localStorage.setItem("User", user);
        localStorage.setItem("type", user.type)
        console.log("success2")
        setUser(response);
        setPopup({
          open: true,
          severity: "success",
          message: "Verification email has been sent to " + registerInfo.email,
        });
        console.log("success2")
      } catch {
        setIsLoginLoading(false)
        setPopup({
          open: true,
          severity: "error",
          message: "Registration failed",
        });
      }
      
    },
    [registerInfo, education, setPopup]
  );
  const referUser = useCallback(
    async (id) => { // Accept id as a parameter
      setIsReferLoading(true);
      setReferError(null);
      try {
        let updatedDetails = {
          ...referralInfo,
        };
  
        console.log("Referral Info", updatedDetails);
        const token = isAuth();
        if (!token) {
          throw new Error('User is not authenticated');
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        var response = await axios.post(`${apiList.refer}/${id}`, updatedDetails, config); // Use the id in the URL
        setIsReferLoading(false);
        if (response.error) {
          return setReferError(response);
        }
        setPopup({
          open: true,
          severity: "success",
          message: "Your referral has been submitted",
        });
      } catch {
        setIsReferLoading(false);
        setPopup({
          open: true,
          severity: "error",
          message: "Referral failed",
        });
      }
    },
    [referralInfo, setPopup]
  );
  

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsLoginLoading(true);
      setLoginError(null);

      // const response = await postRequest(
      //   `${baseUrl}/users/login`,
      //   JSON.stringify(loginInfo)
      // );
      try {
        const response = await (axios.post(apiList.login, loginInfo))
        setIsLoginLoading(false);
        localStorage.setItem("User", response.data);
        localStorage.setItem("type", response.data.type)
        localStorage.setItem("token", response.data.token)
        console.log("user", response.data)
        console.log("type", response.data.type)
        setPopup({
          open: true,
          severity: "success",
          message: "Logged in successfully",
        });
        // console.log("this is user", response.data)
        setUser(response.data);
        // window.location.reload()
      } catch {
        setIsLoginLoading(false);
        setPopup({
          open: true,
          severity: "error",
          message: "Incorrect password",
        });
        return
      }

      // if (response.error) {
      //   return setLoginError(response);
      // }
    },
    [loginInfo, setPopup]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
        registerInfo,
        updateRegisterInfo,
        loginInfo,
        popup,
        setPopup,
        education,
        setEducation,
        experience,
        setExperience,
        updateLoginInfo,
        loginError,
        isLoginLoading,
        registerError,
        isRegisterLoading,
        logoutUser,
        updateUser,
        referralInfo,
        updateReferralInfo,
        referUser,
        isReferLoading,
        referError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};