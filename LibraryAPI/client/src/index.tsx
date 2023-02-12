import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/Pages/Main/App";
import AuthContext from "./contexts/auth-context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
