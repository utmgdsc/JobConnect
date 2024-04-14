import { useEffect, useContext } from "react";
import { createContext, useCallback, useState } from "react";
import apiList from "../lib/apiList";

import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    type: "",
    password: "",
    phone: "",
    company: "",
    address: "",
    skills: [],
    experience: [],
    education: [],
    resume:"",
    age: ""
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

  const updateUser = useCallback((response) => {
    localStorage.setItem("User", JSON.stringify(response));
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
      const response = await (axios.post(apiList.register, updatedDetails))
      
      setIsRegisterLoading(false);

      if (response.error) {
        return setRegisterError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
      setPopup({
        open: true,
        severity: "success",
        message: "Verification email has been sent to " + registerInfo.email,
      });
      // window.alert("Verification email has been sent to " + registerInfo.email);
    },
    [registerInfo, education, setPopup]
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
        console.log("This is saved to localstorage : ", response)
        localStorage.setItem("User", response);
        setPopup({
          open: true,
          severity: "success",
          message: "Logged in successfully",
        });
        console.log("this is user", response.data)
        setUser(response.data);
      } catch {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};