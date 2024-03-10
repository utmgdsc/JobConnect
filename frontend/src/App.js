import EmployerProfile from './components/EmployerProfile';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EmployerProfile />
        {/* <nav>
          <Link to="/fetch-employer" className="App-link">Fetch Employer</Link>
        </nav>

        <Routes>
          <Route path="/fetch-employer" element={<EmployerProfile />} />
        </Routes> */}
      </header>
    </div>
  );
}

export default App;
