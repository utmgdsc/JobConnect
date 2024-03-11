import React from 'react';

import { BrowserRouter as Router, Route, Routes, Link, useLocation, Switch } from 'react-router-dom';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Application from './components/Application';
import EmployerProfile from './components/EmployerProfile';
import UserProfile from './components/UserProfile';

import './App.css';

// Define a Header component that only shows navigation links on the home page ('/')
function Header() {
  const location = useLocation();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/application" element={<Application />} />
          <Route path="/employer" element={<EmployerProfile />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;