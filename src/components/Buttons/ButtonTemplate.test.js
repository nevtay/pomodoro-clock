import React from "react";
import { render } from "@testing-library/react";
import ButtonTemplate from "./ButtonTemplate";

test("Button Text should accept a prop", () => {
  const testText = "test";
  const { getByText } = render(<ButtonTemplate text={testText} />);
  const buttonText = getByText(/TEST/i);
  expect(buttonText.innerHTML).toEqual("test");
});
