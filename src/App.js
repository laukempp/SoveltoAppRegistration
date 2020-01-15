import React from "react";
import "./App.css";
import Register from "./components/registration/Register";
import Routes from "./layout/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
    <div className="App">
      
      <Routes />
    </div> </Router>
  );
}

export default App;
