import React, { useContext, createContext, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  Switch,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Application from "./components/Application";
import EmployerProfile from "./components/EmployerProfile";
import UserProfile from "./components/UserProfile";
import ProfileDashboard from "./components/ProfileDashboard";
import EmployerDashboard from "./components/EmployerDashboard";
import ApplicantsList from "./components/ApplicantsList";
import Jobs from "./components/Jobs";
import AssetPostings from "./components/AssetPostings";
import Events from "./components/Events";
import JobDetails from "./components/JobDetails";
import AssetDetails from "./components/AssetDetails";
import EventDetails from "./components/EventDetails";
import CreateJobPosting from "./components/CreateJobPosting";
import CreateAssetPosting from "./components/CreateAssetPosting";
import CreateEvent from "./components/CreateEvent";
import ManagePostings from "./components/ManagePostings";
import Login from "./components/Login"
import Logout from "./components/Logout"
import Register from "./components/Register"
import MessagePopup from "./lib/MessagePopup";
import "./App.css"; import ApplyAsset from "./components/ApplyAsset";
import ResumeFeedback from "./components/ResumeFeedback";
import RegisterEvent from "./components/RegisterEvent";
import { AuthContext } from "./context/AuthContext";
import VerifyEmail from "./components/VerifyEmail";
import Chat from "./components/Chat";
export const SetPopupContext = createContext();

// Define a Header component that only shows navigation links on the home page ('/')
function App() {
  const { user } = useContext(AuthContext);
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  return (
    <Router>
      <div className="App">
        <SetPopupContext.Provider value={setPopup}>
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={user ? <Chat /> : <Login />} />
            <Route path="/application/:id" element={<Application />} />
            <Route path="/employer/:id" element={<EmployerProfile />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/applicant-dashboard/:id" element={<ProfileDashboard />} />
            <Route path="/employer-dashboard/:id" element={<EmployerDashboard />} />
            <Route path="/get-applicants/:jobId" element={<ApplicantsList />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/assets" element={<AssetPostings />} />
            <Route path="/events" element={<Events />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/asset/:id" element={<AssetDetails />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/create/job/:id?" element={<CreateJobPosting />} />
            <Route path="/create/asset/:id?" element={<CreateAssetPosting />} />
            <Route path="/create/event/:id?" element={<CreateEvent />} />
            <Route path="/manage-postings/:id" element={<ManagePostings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/apply-asset/:assetId" element={<ApplyAsset />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="resume" element={<ResumeFeedback />} />
            <Route path="register-event/:eventId" element={<RegisterEvent />} />
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