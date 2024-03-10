import EmployerProfile from './pages/EmployerProfile';
import JobSeekerFetcher from './pages/JobSeekerFetcher';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          {/* Link to navigate to the JobSeekerFetcher component */}
          <Link to="/fetch-job-seeker" className="App-link">Fetch Job Seeker</Link>
          <Link to="/fetch-employer" className="App-link">Fetch Employer</Link>
        </nav>

        {/* A <Routes> component instead of <Switch> to match the current URL to a <Route> */}
        <Routes>
          <Route path="/fetch-job-seeker" element={<JobSeekerFetcher />} />
          {/* You can add more <Route> components here for other paths, using the element prop */}
          <Route path="/fetch-employer" element={<EmployerProfile />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
