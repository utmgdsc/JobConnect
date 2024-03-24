import React from "react";

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
import JobDetails from "./components/JobDetails";
import Application from "./components/Application";
import EmployerProfile from "./components/EmployerProfile";
import UserProfile from "./components/UserProfile";
import ProfileDashboard from "./components/ProfileDashboard";
import ApplicantsList from "./components/ApplicantsList";
import AssetPostings from "./components/AssetPostings";
import AssetDetails from "./components/AssetDetails";
import Events from "./components/Events";
import CreateJobPosting from "./components/CreateJobPosting";
import CreateAssetPosting from "./components/CreateAssetPosting";
import CreateEvent from "./components/CreateEvent";
import "./App.css";

// Define a Header component that only shows navigation links on the home page ('/')
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/application" element={<Application />} />
          <Route path="/employer/:id" element={<EmployerProfile />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/dashboard/:id" element={<ProfileDashboard />} />
          <Route path="/get-applicants/:jobId" element={<ApplicantsList />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/assets" element={<AssetPostings />} />
          <Route path="/events" element={<Events />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/asset/:id" element={<AssetDetails />} />
          <Route path="/create/job/:id?" element={<CreateJobPosting />} />
          <Route path="/create/asset/:id?" element={<CreateAssetPosting />} />
          {/*<Route path="/create/event/:id?" element={<CreateEvent />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
