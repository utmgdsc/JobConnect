import EmployerProfile from './components/EmployerProfile';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          {/* Link to navigate to the JobSeekerFetcher component */}
          <Link to="/fetch-employer" className="App-link">Fetch Employer</Link>
        </nav>

        {/* A <Routes> component instead of <Switch> to match the current URL to a <Route> */}
        <Routes>
          {/* You can add more <Route> components here for other paths, using the element prop */}
          <Route path="/fetch-employer" element={<EmployerProfile />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
