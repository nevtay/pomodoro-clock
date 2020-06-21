import React from "react";
import { render } from "@testing-library/react";
import TimerDisplay from "./TimerDisplay";

test("TimerDisplay shows 25:00 by default", () => {
  const { getByText } = render(<TimerDisplay />);
  const defaultStartTime = getByText(/25:00/i);
  expect(defaultStartTime).toBeInTheDocument();
});
