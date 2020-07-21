import React, { useState, useRef, useEffect } from "react";
import ButtonTemplate from "../Buttons/ButtonTemplate";
import "./TimerDisplay.css";
import ding from "../../audio/ding.wav";

export default function TimerDisplay() {
  const ONE_SECOND_IN_MILLISECONDS = 1000;
  const ONE_MINUTE_IN_MILLISECONDS = ONE_SECOND_IN_MILLISECONDS * 60;
  const TWENTY_FIVE_MINUTES = ONE_MINUTE_IN_MILLISECONDS * 25;
  const FIVE_MINUTES = ONE_MINUTE_IN_MILLISECONDS * 5;
  const timeEndedSound = new Audio(ding);
  const timeLeft = useRef(null);
  const intervalId = useRef();
  const [isBreakPhase, setIsBreakPhase] = useState(null);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [remainingTime, setRemainingTime] = useState(TWENTY_FIVE_MINUTES);
  const [timerIsRunning, setTimerIsRunning] = useState(null);
  const [minutesLeft, setMinutesLeft] = useState(
    Math.floor(remainingTime / ONE_MINUTE_IN_MILLISECONDS)
  );
  const [secondsLeft, setSecondsLeft] = useState(
    remainingTime % ONE_MINUTE_IN_MILLISECONDS
  );

  useEffect(() => {
    if (timeLeft.current === null) {
      return;
    } else {
      updateRemainingMinutesAndSeconds(timeLeft.current);
    }
  });

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
      setRemainingTime(timeLeft.current);
    } else if (isBreakPhase && timeLeft.current <= 0) {
      clearInterval(intervalId.current);
      setIsWorkPhase(true);
      setIsBreakPhase(false);
      setTimerIsRunning(false);
      timeLeft.current = TWENTY_FIVE_MINUTES;
      setRemainingTime(timeLeft.current);
    } else {
      setRemainingTime((timeLeft.current -= 1000));
      if (timeLeft.current < 1000) {
        timeEndedSound.play();
      }
    }
  };

  const updateRemainingMinutesAndSeconds = (time) => {
    const updatedMinuteValue = Math.floor(time / ONE_MINUTE_IN_MILLISECONDS);
    const updatedSecondValue = (time % ONE_MINUTE_IN_MILLISECONDS) / 1000;
    setMinutesLeft(updatedMinuteValue);
    setSecondsLeft(updatedSecondValue);
  };

  const pauseTimer = () => {
    setTimerIsRunning(false);
    clearInterval(intervalId.current);
  };

  const resetTimer = () => {
    pauseTimer();
    isWorkPhase
      ? (timeLeft.current = TWENTY_FIVE_MINUTES)
      : (timeLeft.current = FIVE_MINUTES);
    setRemainingTime(timeLeft.current);
  };

  return (
    <div className="timer">
      <div className="timer-display-value">
        <h1 aria-label="timer-display">
          {minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:
          {secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
        </h1>
      </div>
      <div className="timer-buttons">
        <div>
          <ButtonTemplate
            text="Start"
            class="btn btn-start"
            onClick={startTimer}
          />
        </div>
        <div>
          <ButtonTemplate
            text="Pause"
            class="btn btn-pause"
            onClick={pauseTimer}
          />
        </div>
        <div>
          <ButtonTemplate
            text="Reset"
            class="btn btn-reset"
            onClick={resetTimer}
          />
        </div>
      </div>
    </div>
  );
}
