import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserProfile />
      </header>
    </div>
  );
}

export default App;
