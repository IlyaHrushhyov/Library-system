import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';

function App() {
  return (
      <div className="app">
          <Login />
      </div>
  );
}

export default App;
