/**
 * @jest-environment jsdom
 */

import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../page";

test("loads basic layout", async () => {
  render(<Page />);
  expect(screen.getByRole("heading")).toHaveTextContent(
    "Roman numeral converter"
  );
  expect(screen.getByTestId("color-theme-button")).toBeInTheDocument();
  expect(screen.getByText("Enter a number (1 - 3999)")).toBeInTheDocument();
  expect(screen.getByText("Convert to roman numeral")).toBeInTheDocument();
  expect(screen.getByText("Roman numeral:")).toBeInTheDocument();
});
