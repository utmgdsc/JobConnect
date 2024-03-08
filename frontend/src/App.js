import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Routes instead of Switch
import JobSeekerFetcher from './components/ApplicantsLV'; // Adjust the import path as necessary
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            {/* Link to navigate to the JobSeekerFetcher component */}
            <Link to="/fetch-job-seeker" className="App-link">Fetch Job Seeker</Link>
          </nav>

          {/* A <Routes> component instead of <Switch> to match the current URL to a <Route> */}
          <Routes>
            <Route path="/fetch-job-seeker" element={<JobSeekerFetcher />} />
            {/* You can add more <Route> components here for other paths, using the element prop */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
