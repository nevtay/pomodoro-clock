import React from "react";
import "./App.css";

// components
import TimerDisplay from "./components/Display/TimerDisplay";

function App() {
  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <TimerDisplay />
    </div>
  );
}

export default App;
