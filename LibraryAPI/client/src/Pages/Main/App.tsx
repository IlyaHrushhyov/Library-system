import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";

function App() {
  return (
    <div className="login">
      <Login />
    </div>
  );
}

export default App;
