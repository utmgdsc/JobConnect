import React, { createContext, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  Switch,
} from "react-router-dom";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Application from "./components/Application";
import EmployerProfile from "./components/EmployerProfile";
import UserProfile from "./components/UserProfile";
import ProfileDashboard from "./components/ProfileDashboard";
import ApplicantsList from "./components/ApplicantsList";
import AssetPostings from "./components/AssetPostings";
import Events from "./components/Events";
import Login from "./components/Login"
import Logout from "./components/Logout"
import Register from "./components/Register"
import MessagePopup from "./lib/MessagePopup";


export const SetPopupContext = createContext();

// Define a Header component that only shows navigation links on the home page ('/')
function App() {
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  return (
    <Router>
      <div className="App">
      <SetPopupContext.Provider value={setPopup}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/application" element={<Application />} />
          <Route path="/employer" element={<EmployerProfile />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/applicant-profile/:id" element={<ProfileDashboard />} />
          <Route path="/get-applicants/:jobId" element={<ApplicantsList />} />
          <Route path="/assets" element={<AssetPostings />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
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
      </div>
    </Router>
  );
}

export default App;