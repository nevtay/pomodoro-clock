import React, { useState, useRef } from "react";
import ButtonTemplate from "../Buttons/ButtonTemplate";

export default function TimerDisplay() {
  const ONE_SECOND_IN_MILLISECONDS = 1000;
  const ONE_MINUTE_IN_MILLISECONDS = ONE_SECOND_IN_MILLISECONDS * 60;
  const TWENTY_FIVE_MINUTES = ONE_MINUTE_IN_MILLISECONDS * 25;
  const FIVE_MINUTES = ONE_MINUTE_IN_MILLISECONDS * 5;
  const timeLeft = useRef(null);
  const intervalId = useRef();
  const [isBreakPhase, setIsBreakPhase] = useState(null);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  let [remainingTime, setRemainingTime] = useState(TWENTY_FIVE_MINUTES);
  let [timerIsRunning, setTimerIsRunning] = useState(null);
  let [minutesLeft, setMinutesLeft] = useState(
    Math.floor(remainingTime / ONE_MINUTE_IN_MILLISECONDS)
  );
  let [secondsLeft, setSecondsLeft] = useState(
    remainingTime % ONE_MINUTE_IN_MILLISECONDS
  );

  const updateRemainingMinutesAndSeconds = (time) => {
    const updatedMinuteValue = Math.floor(time / ONE_MINUTE_IN_MILLISECONDS);
    const updatedSecondValue = (time % ONE_MINUTE_IN_MILLISECONDS) / 1000;
    setMinutesLeft(updatedMinuteValue);
    setSecondsLeft(updatedSecondValue);
  };

  const startTimer = () => {
    if (timerIsRunning) {
      return;
    } else {
      setTimerIsRunning(true);
      const timerId = setInterval(handleStartTime, 1000);
      timeLeft.current = remainingTime;
      intervalId.current = timerId;
    }
  };

  const handleStartTime = () => {
    if (isWorkPhase && timeLeft.current <= 0) {
      clearInterval(intervalId.current);
      setIsWorkPhase(false);
      setIsBreakPhase(true);
      setTimerIsRunning(false);
      timeLeft.current = FIVE_MINUTES;
      setRemainingTime(FIVE_MINUTES);
      updateRemainingMinutesAndSeconds(timeLeft.current);
    } else if (isBreakPhase && timeLeft.current <= 0) {
      clearInterval(intervalId.current);
      setIsWorkPhase(true);
      setIsBreakPhase(false);
      setTimerIsRunning(false);
      timeLeft.current = TWENTY_FIVE_MINUTES;
      setRemainingTime(TWENTY_FIVE_MINUTES);
      updateRemainingMinutesAndSeconds(timeLeft.current);
    } else {
      setRemainingTime((timeLeft.current -= 1000));
      updateRemainingMinutesAndSeconds(timeLeft.current);
    }
  };

  const pauseTimer = () => {
    setTimerIsRunning(false);
    clearInterval(intervalId.current);
  };

  const resetTimer = () => {
    if (isWorkPhase) {
      setTimerIsRunning(false);
      clearInterval(intervalId.current);
      timeLeft.current = TWENTY_FIVE_MINUTES;
      setRemainingTime(timeLeft.current);
      updateRemainingMinutesAndSeconds(timeLeft.current);
    } else if (isBreakPhase) {
      setTimerIsRunning(false);
      clearInterval(intervalId.current);
      timeLeft.current = FIVE_MINUTES;
      setRemainingTime(timeLeft.current);
      updateRemainingMinutesAndSeconds(timeLeft.current);
    }
  };

  return (
    <div>
      <div>
        <h1 aria-label="timer-display">
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
