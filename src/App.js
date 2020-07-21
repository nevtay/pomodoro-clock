import React from "react";
import "./App.css";

// components
import TimerDisplay from "./components/Display/TimerDisplay";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="background-gradient background-gradient-filter">
      <Navbar />
      <TimerDisplay />
    </div>
  );
}

export default App;
