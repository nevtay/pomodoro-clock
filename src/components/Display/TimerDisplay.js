import React from "react";
import ButtonTemplate from "../Buttons/ButtonTemplate";

export default function TimerDisplay() {
  const ONE_SECOND_IN_MILLISECONDS = 1000;
  const ONE_MINUTE_IN_MILLISECONDS = ONE_SECOND_IN_MILLISECONDS * 60;
  let minuteDisplay =
    (ONE_MINUTE_IN_MILLISECONDS * 25) / ONE_MINUTE_IN_MILLISECONDS;
  const secondDisplay = () => {
    let seconds =
      (ONE_MINUTE_IN_MILLISECONDS * 25) % ONE_MINUTE_IN_MILLISECONDS;
    let isBelowTenSeconds = seconds < 10;
    return isBelowTenSeconds ? "0" + String(seconds) : seconds;
  };
  return (
    <div>
      <div>
        <h1>
          {minuteDisplay}:{secondDisplay()}
        </h1>
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
