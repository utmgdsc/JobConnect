import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import ProfileDashboard from './components/ProfileDashboard';
import ApplicantsList from './components/ApplicantsList';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

// Define a Header component that only shows navigation links on the home page ('/')
function Header() {
  const location = useLocation();

  return (
    location.pathname === '/' && (
      <header className="App-header">
        <nav>
          <Link to="/fetch-job-seeker" className="App-link">Fetch Job Seeker</Link>
        </nav>
        <nav>
          <Link to="/get-applicants" className="App-link">Get Applicants list</Link>
        </nav>
        <nav>
          <Link to="/register" className="App-link">register</Link>
        </nav>
        <nav>
          <Link to="/login" className="App-link">login</Link>
        </nav>
      </header>
    )
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ProfileDashboard />} />
          <Route path="/fetch-job-seeker" element={<ProfileDashboard />} />
          <Route path="/get-applicants/:jobId" element={<ApplicantsList />} />
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/login' element={<Login/>} />
          {/* If you have a home component or any other route, define them here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
