import {
    AppBar,
    Toolbar,
    Typography,
    Button,
  } from "@mui/material";

import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

import isAuth, { userType } from "../lib/isAuth";

const useStyles = styled((theme) => ({
root: {
    flexGrow: 1,
},
menuButton: {
    marginRight: theme.spacing(2),
},
title: {
    flexGrow: 1,
},
}));

const Navbar = (props) => {
const classes = useStyles();
let history = useNavigate();

const handleClick = (location) => {
    console.log(location);
    history(location);
};

return (
    <AppBar position="fixed">
    <Toolbar>
        <Typography variant="h6" className={classes.title}>
        Job Portal
        </Typography>
        {isAuth() ? (
        userType() === "recruiter" ? (
            <>
            <Button color="inherit" onClick={() => handleClick("/home")}>
                Home
            </Button>
            <Button color="inherit" onClick={() => handleClick("/addjob")}>
                Add Jobs
            </Button>
            <Button color="inherit" onClick={() => handleClick("/myjobs")}>
                My Jobs
            </Button>
            <Button color="inherit" onClick={() => handleClick("/employees")}>
                Employees
            </Button>
            <Button color="inherit" onClick={() => handleClick("/profile")}>
                Profile
            </Button>
            <Button color="inherit" onClick={() => handleClick("/logout")}>
                Logout
            </Button>
            </>
        ) : (
            <>
            <Button color="inherit" onClick={() => handleClick("/home")}>
                Home
            </Button>
            <Button
                color="inherit"
                onClick={() => handleClick("/applications")}
            >
                Applications
            </Button>
            <Button color="inherit" onClick={() => handleClick("/profile")}>
                Profile
            </Button>
            <Button color="inherit" onClick={() => handleClick("/logout")}>
                Logout
            </Button>
            <Button color="inherit" onClick={() => handleClick("/login")}>
            Login
            </Button>
            <Button color="inherit" onClick={() => handleClick("/register")}>
            Register
            </Button>
            </>
        )
        ) : (
        <>
            <Button color="inherit" onClick={() => handleClick("/login")}>
            Login
            </Button>
            <Button color="inherit" onClick={() => handleClick("/signup")}>
            Signup
            </Button>
        </>
        )}
    </Toolbar>
    </AppBar>
);
};

export default Navbar;