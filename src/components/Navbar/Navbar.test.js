import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";

test("TimerDisplay shows 25:00 by default", () => {
  const { getByText } = render(<Navbar />);
  const projectTitle = getByText(/Pomodoro TImer/i);
  expect(projectTitle).toBeInTheDocument();
});
