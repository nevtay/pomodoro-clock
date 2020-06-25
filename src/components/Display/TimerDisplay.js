import React, { useState } from "react";
import ButtonTemplate from "../Buttons/ButtonTemplate";

export default function TimerDisplay() {
  const ONE_SECOND_IN_MILLISECONDS = 1000;
  const ONE_MINUTE_IN_MILLISECONDS = ONE_SECOND_IN_MILLISECONDS * 60;
  let DEFAULT_REMAINING_TIME_IN_MINUTES = ONE_MINUTE_IN_MILLISECONDS * 25;
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  let [minutesLeft, setMinutesLeft] = useState(
    Math.floor(DEFAULT_REMAINING_TIME_IN_MINUTES / ONE_MINUTE_IN_MILLISECONDS)
  );
  let [secondsLeft, setSecondsLeft] = useState(
    DEFAULT_REMAINING_TIME_IN_MINUTES % ONE_MINUTE_IN_MILLISECONDS
  );

  const handleStartTime = () => {
    if (DEFAULT_REMAINING_TIME_IN_MINUTES <= 0) {
      return;
    } else {
      DEFAULT_REMAINING_TIME_IN_MINUTES -= 1000;
      const updateMinuteValue = Math.floor(
        DEFAULT_REMAINING_TIME_IN_MINUTES / ONE_MINUTE_IN_MILLISECONDS
      );
      const updatedSecondValue =
        (DEFAULT_REMAINING_TIME_IN_MINUTES % ONE_MINUTE_IN_MILLISECONDS) / 1000;
      setMinutesLeft(updateMinuteValue);
      setSecondsLeft(updatedSecondValue);
    }
  };

  const startTimer = () => {
    if (timerIsRunning) {
      return;
    } else {
      setTimerIsRunning(true);
      setInterval(handleStartTime, 1000);
    }
  };

  return (
    <div>
      <div>
        <h1>
          {minutesLeft}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
        </h1>
      </div>
      <div>
        <ButtonTemplate text="Start" onClick={startTimer} />
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
