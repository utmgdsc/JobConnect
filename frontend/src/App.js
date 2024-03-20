import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid"

import Welcome, { ErrorPage } from "./components/Welcome";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
// import Home from "./component/Home";
// import Applications from "./component/Applications";
// import Profile from "./component/Profile";
// import CreateJobs from "./component/recruiter/CreateJobs";
// import MyJobs from "./component/recruiter/MyJobs";
// import JobApplications from "./component/recruiter/JobApplications";
// import AcceptedApplicants from "./component/recruiter/AcceptedApplicants";
// import RecruiterProfile from "./component/recruiter/Profile";
import MessagePopup from "./lib/MessagePopup";
import isAuth, { userType } from "./lib/isAuth";

const useStyles = styled((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

export const SetPopupContext = createContext();

function App() {
  const classes = useStyles();
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  return (
    <BrowserRouter>
      <SetPopupContext.Provider value={setPopup}>
        <Grid container direction="column">
          <Grid item xs>
            <Navbar />
          </Grid>
          <Grid item className={classes.body}>
            <Routes>
              {/* <Route exact path="/">
                <Welcome />
              </Route> */}
              <Route exact path="/" element={<Welcome />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/logout" element={<Logout />} />
              {/* <Route exact path="/home" element={<Home />} /> */}
              {/* <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/applications">
                <Applications />
              </Route>
              <Route exact path="/profile">
                {userType() === "recruiter" ? (
                  <RecruiterProfile />
                ) : (
                  <Profile />
                )}
              </Route>
              <Route exact path="/addjob">
                <CreateJobs />
              </Route>
              <Route exact path="/myjobs">
                <MyJobs />
              </Route>
              <Route exact path="/job/applications/:jobId">
                <JobApplications />
              </Route>
              <Route exact path="/employees">
                <AcceptedApplicants />
              </Route>
              <Route>
                <ErrorPage />
              </Route> */}
            </Routes>
          </Grid>
        </Grid>
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;

// import React, { createContext, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
// import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
// import ProfileDashboard from './components/ProfileDashboard';
// import ApplicantsList from './components/ApplicantsList';
// import Register from './components/Register';
// import Login from './components/Login';
// import './App.css';
// import { Grid, styled } from "@mui/material"
// import isAuth, { userType } from './lib/isAuth';

// export const SetPopupContext = createContext();

// // const Header = () => {
// //   const location = useLocation();

// //   return (
// //     location.pathname === '/' && (
// //       <header className="App-header">
// //         <Navbar>
// //           <Nav className="mr-auto">
// //             <Nav.Link as={Link} to="/fetch-job-seeker">Fetch Job Seeker</Nav.Link>
// //             <Nav.Link as={Link} to="/get-applicants">Get Applicants list</Nav.Link>
// //             <Nav.Link as={Link} to="/register">Register</Nav.Link>
// //             <Nav.Link as={Link} to="/login">Login</Nav.Link>
// //           </Nav>
// //         </Navbar>
// //       </header>
// //     )
// //   );
// // };

// const App = () => {
//   const [popup, setPopup] = useState({
//     open: false,
//     severity: '',
//     message: '',
//   });

//   return (
//     <Router>
//       <SetPopupContext.Provider value={setPopup}>
//         <Container fluid>
//           <Header />
//           <Row className="App-body">
//             <Col>
//               <Routes>
//                 <Route path="/" element={<ProfileDashboard />} />
//                 <Route path="/fetch-job-seeker" element={<ProfileDashboard />} />
//                 <Route path="/get-applicants/:jobId" element={<ApplicantsList />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/login" element={<Login />} />
//               </Routes>
//             </Col>
//           </Row>
//         </Container>
//         {/* Your MessagePopup component here */}
//       </SetPopupContext.Provider>
//     </Router>
//   );
// };

// export default App;
