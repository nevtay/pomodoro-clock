import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("Project title is in the document", () => {
  const { getByText } = render(<App />);
  const projectTitle = getByText(/Pomodoro Timer/i);
  expect(projectTitle).toBeInTheDocument();
});
