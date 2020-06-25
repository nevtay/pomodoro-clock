import React, { useState } from "react";
import ButtonTemplate from "../Buttons/ButtonTemplate";

export default function TimerDisplay() {
  const ONE_SECOND_IN_MILLISECONDS = 1000;
  const ONE_MINUTE_IN_MILLISECONDS = ONE_SECOND_IN_MILLISECONDS * 60;
  const TWENTY_FIVE_MINUTES = ONE_MINUTE_IN_MILLISECONDS * 25;
  let [remainingTime, setRemainingTime] = useState(TWENTY_FIVE_MINUTES);
  let [intervalIsRunning, setIntervalIsRunning] = useState();
  let [timerIsRunning, setTimerIsRunning] = useState(false);
  let [minutesLeft, setMinutesLeft] = useState(
    Math.floor(remainingTime / ONE_MINUTE_IN_MILLISECONDS)
  );
  let [secondsLeft, setSecondsLeft] = useState(
    remainingTime % ONE_MINUTE_IN_MILLISECONDS
  );

  const handleStartTime = () => {
    if (remainingTime <= 0) {
      return;
    } else {
      setRemainingTime((remainingTime -= 1000));
      let updatedMinuteValue = Math.floor(
        remainingTime / ONE_MINUTE_IN_MILLISECONDS
      );
      let updatedSecondValue =
        (remainingTime % ONE_MINUTE_IN_MILLISECONDS) / 1000;
      setMinutesLeft(updatedMinuteValue);
      setSecondsLeft(updatedSecondValue);
    }
  };

  const startTimer = () => {
    if (timerIsRunning) {
      return;
    }
    setTimerIsRunning(true);
    setIntervalIsRunning(setInterval(handleStartTime, 1000));
  };

  const pauseTimer = () => {
    setTimerIsRunning(false);
    setIntervalIsRunning(clearInterval(intervalIsRunning));
  };

  const resetTimer = () => {
    setTimerIsRunning(false);
    setIntervalIsRunning(clearInterval(intervalIsRunning));
    remainingTime = TWENTY_FIVE_MINUTES;
    setRemainingTime(TWENTY_FIVE_MINUTES);
    let updatedMinuteValue = Math.floor(
      remainingTime / ONE_MINUTE_IN_MILLISECONDS
    );
    let updatedSecondValue =
      (remainingTime % ONE_MINUTE_IN_MILLISECONDS) / 1000;
    setMinutesLeft(updatedMinuteValue);
    setSecondsLeft(updatedSecondValue);
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
        <ButtonTemplate text="Pause" onClick={pauseTimer} />
      </div>
      <div>
        <ButtonTemplate text="Reset" onClick={resetTimer} />
      </div>
    </div>
  );
}
