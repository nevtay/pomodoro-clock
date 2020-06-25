import React from "react";
import { render } from "@testing-library/react";
import ButtonTemplate from "./ButtonTemplate";

test("Button component should accept a text prop", () => {
  const testText = "test";
  const { getByText } = render(<ButtonTemplate text={testText} />);
  const buttonText = getByText(testText);
  expect(buttonText.innerHTML).toEqual(testText);
});
