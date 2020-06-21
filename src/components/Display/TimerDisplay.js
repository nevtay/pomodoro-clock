import React from "react";
import ButtonTemplate from "../Buttons/ButtonTemplate";

export default function TimerDisplay() {
  return (
    <div>
      <div>
        <h1>25:00</h1>
      </div>
      <div>
        <ButtonTemplate text="Start" />
      </div>
      <div>
        <ButtonTemplate text="Pause" />
      </div>
      <div>
        <ButtonTemplate text="Reset" />
      </div>
    </div>
  );
}
