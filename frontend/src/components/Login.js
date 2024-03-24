import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import { SetPopupContext } from "../App";
import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";

// import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";
import { Container, Form, Button, Navbar, Nav } from 'react-bootstrap';

const Login = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [loggedin, setLoggedin] = useState(isAuth());

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      axios
        .post('http://localhost:3000/api/auth/login', loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  return loggedin ? (
    <Navigate to="/" />
  ) : (
    <Container className="mt-5">
      <Form>
        <h3 className="text-center">Login</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <EmailInput
            label="Email"
            value={loginDetails.email}
            onChange={(event) =>
              handleInput("email", event.target.value)
            }
            inputErrorHandler={inputErrorHandler}
            handleInputError={handleInputError}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <PasswordInput
            label="Password"
            value={loginDetails.password}
            onChange={(event) =>
              handleInput("password", event.target.value)
            }
          />
        </Form.Group>
        <Button
          variant="primary"
          type="button"
          onClick={() => handleLogin()}
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
