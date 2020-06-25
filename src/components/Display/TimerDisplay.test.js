import React from "react";
import { render } from "@testing-library/react";
import TimerDisplay from "./TimerDisplay";

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
