import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import More1 from "./components/More1";
import More2 from "./components/More2";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Alert from "./components/Alert";

function App() {
  const [alert, setalert] = useState(null);
  const showAlert = (message, type) => {
    setalert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 2500);
  };
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/more1" element={<More1 />} />
            <Route exact path="/more2" element={<More2 />} />
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
