import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";

test("Navbar contains title of project", () => {
  const projectTitle = "Pomodoro TImer";
  const { getByText } = render(<Navbar />);
  const findProjectTitle = getByText(projectTitle);
  expect(findProjectTitle).toBeInTheDocument();
});
