import React from "react";
import ButtonTemplate from "../Buttons/ButtonTemplate";

export default function TimerDisplay() {
  const ONE_SECOND_IN_MILLISECONDS = 1000;
  const ONE_MINUTE_IN_MILLISECONDS = ONE_SECOND_IN_MILLISECONDS * 60;
  const TWENTY_FIVE_MINUTES_IN_MILLISECONDS = ONE_MINUTE_IN_MILLISECONDS * 25;
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
