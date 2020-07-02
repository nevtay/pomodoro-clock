import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import TimerDisplay from "./TimerDisplay";

const ONE_SECOND_IN_MILLISECONDS = 1000;
const ONE_MINUTE_IN_MILLISECONDS = ONE_SECOND_IN_MILLISECONDS * 60;
const WORK_PHASE_DURATION = ONE_MINUTE_IN_MILLISECONDS * 25;
const BREAK_PHASE_DURATION = ONE_MINUTE_IN_MILLISECONDS * 5;

jest.useFakeTimers();

let playStub;

beforeEach(() => {
  playStub = jest
    .spyOn(window.HTMLMediaElement.prototype, "play")
    .mockImplementation(() => {});
});

test("TimerDisplay shows 25:00 by default", () => {
  const { getByText } = render(<TimerDisplay />);
  const defaultStartTime = getByText(/25:00/i);
  expect(defaultStartTime).toBeInTheDocument();
});

test("TimerDisplay has three buttons", () => {
  const { getAllByLabelText } = render(<TimerDisplay />);
  const buttons = getAllByLabelText(/button/i);
  expect(buttons.length).toEqual(3);
});

test("TimerDisplay has a start button", () => {
  const { getByText } = render(<TimerDisplay />);
  const startButton = getByText(/Start/i);
  expect(startButton.tagName).toEqual("BUTTON");
  expect(startButton.innerHTML).toEqual("Start");
});

test("TimerDisplay has a pause button", () => {
  const { getByText } = render(<TimerDisplay />);
  const pauseButton = getByText(/Pause/i);
  expect(pauseButton.tagName).toEqual("BUTTON");
  expect(pauseButton.innerHTML).toEqual("Pause");
});

test("TimerDisplay has a reset button", () => {
  const { getByText } = render(<TimerDisplay />);
  const resetButton = getByText(/Reset/i);
  expect(resetButton.tagName).toEqual("BUTTON");
  expect(resetButton.innerHTML).toEqual("Reset");
});

test("TimerDisplay time should display 25:00 (25 minutes) by default", () => {
  const { getByLabelText } = render(<TimerDisplay />);
  const timeLeft = getByLabelText(/timer-display/i);
  expect(timeLeft.innerHTML).toEqual("25:00");
});

test("TimerDisplay time should count down one second at a time", () => {
  const { getByText, getByLabelText } = render(<TimerDisplay />);
  const startButton = getByText(/Start/i);
  const timeLeft = getByLabelText(/timer-display/i);
  act(() => {
    fireEvent.click(startButton);
    jest.advanceTimersByTime(1000);
    expect(timeLeft.innerHTML).toEqual("24:59");
    jest.advanceTimersByTime(2000);
    expect(timeLeft.innerHTML).toEqual("24:57");
  });
  jest.clearAllTimers();
});

test("After completing the work phase (25 minutes) by reaching 00:00, the timer should automatically transition to the break phase and display the appropriate time", () => {
  const { getByText, getByLabelText } = render(<TimerDisplay />);
  const startButton = getByText(/Start/i);
  const timeLeft = getByLabelText(/timer-display/i);
  act(() => {
    fireEvent.click(startButton);
    jest.advanceTimersByTime(WORK_PHASE_DURATION);
    expect(timeLeft.innerHTML).toEqual("00:00");
    jest.advanceTimersByTime(ONE_SECOND_IN_MILLISECONDS);
    expect(timeLeft.innerHTML).toEqual("05:00");
    playStub.mockRestore();
  });
  jest.clearAllTimers();
});

test("At the end of either the work or break phase, a 'ding' sound should play when the timer reaches 00:00", () => {
  const { getByText, getByLabelText } = render(<TimerDisplay />);
  const startButton = getByText(/Start/i);
  const timeLeft = getByLabelText(/timer-display/i);
  act(() => {
    expect(timeLeft.innerHTML).toEqual("25:00");
    fireEvent.click(startButton);
    jest.runAllTimers();
    expect(playStub).toHaveBeenCalledTimes(1);

    expect(timeLeft.innerHTML).toEqual("05:00");
    fireEvent.click(startButton);
    jest.runAllTimers();
    expect(playStub).toHaveBeenCalledTimes(2);
  });
});
