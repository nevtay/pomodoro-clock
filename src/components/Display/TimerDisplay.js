import React, { useState, useRef } from "react";
import ButtonTemplate from "../Buttons/ButtonTemplate";

export default function TimerDisplay() {
  const ONE_SECOND_IN_MILLISECONDS = 1000;
  const ONE_MINUTE_IN_MILLISECONDS = ONE_SECOND_IN_MILLISECONDS * 60;
  const TWENTY_FIVE_MINUTES = ONE_MINUTE_IN_MILLISECONDS * 25;
  const timeLeft = useRef(null);
  const intervalId = useRef();
  let [remainingTime, setRemainingTime] = useState(TWENTY_FIVE_MINUTES);
  let [timerIsRunning, setTimerIsRunning] = useState(null);
  let [minutesLeft, setMinutesLeft] = useState(
    Math.floor(remainingTime / ONE_MINUTE_IN_MILLISECONDS)
  );
  let [secondsLeft, setSecondsLeft] = useState(
    remainingTime % ONE_MINUTE_IN_MILLISECONDS
  );

  const startTimer = () => {
    if (timerIsRunning) {
      return;
    } else {
      setTimerIsRunning(true);
      timeLeft.current = remainingTime;
      const timerId = setInterval(handleStartTime, 1000);
      intervalId.current = timerId;
    }
  };

  const handleStartTime = () => {
    if (timeLeft.current <= 0) {
      clearInterval(intervalId.current);
    } else {
      setRemainingTime((timeLeft.current -= 1000));
      let updatedMinuteValue = Math.floor(
        timeLeft.current / ONE_MINUTE_IN_MILLISECONDS
      );
      let updatedSecondValue =
        (timeLeft.current % ONE_MINUTE_IN_MILLISECONDS) / 1000;
      setMinutesLeft(updatedMinuteValue);
      setSecondsLeft(updatedSecondValue);
    }
  };

  const pauseTimer = () => {
    setTimerIsRunning(false);
    clearInterval(intervalId.current);
  };

  const resetTimer = () => {
    setTimerIsRunning(false);
    clearInterval(intervalId.current);
    timeLeft.current = TWENTY_FIVE_MINUTES;
    setRemainingTime(timeLeft.current);
    let updatedMinuteValue = Math.floor(
      timeLeft.current / ONE_MINUTE_IN_MILLISECONDS
    );
    let updatedSecondValue =
      (timeLeft.current % ONE_MINUTE_IN_MILLISECONDS) / 1000;
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
