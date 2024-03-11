import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Application from './components/Application';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/application" element={<Application />} />
          {/* <Route path="/" */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;