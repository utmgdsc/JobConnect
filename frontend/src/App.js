import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmployerProfile from './components/EmployerProfile';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EmployerProfile />
        <UserProfile />
      </header>
    </div>
  );
}

export default App;
