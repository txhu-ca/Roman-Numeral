// @ts-check
import { test, expect } from "@playwright/test";

test("Testing user input and conversion", async ({ page }) => {
  await page.goto("http://localhost:8080/");
  await expect(page).toHaveTitle("Roman numeral converter");

  const userInput = page.getByTestId("input");
  await userInput.fill("2025");
  const submitButton = page.getByTestId("submit");
  await submitButton.click();
  const result = page.getByTestId("result");
  await expect(result).toContainText("MMXXV");
});

test("Testing invalid input", async ({ page }) => {
  await page.goto("http://localhost:8080/");

  const userInput = page.getByTestId("input");
  await userInput.fill("badinput124");
  const submitButton = page.getByTestId("submit");
  await submitButton.click();
  const form = page.getByTestId("input");
  await expect(page.getByText("Not a valid number.")).toBeVisible();
});

test("Testing input outside of range", async ({ page }) => {
  await page.goto("http://localhost:8080/");

  const userInput = page.getByTestId("input");
  await userInput.fill("0");
  const submitButton = page.getByTestId("submit");
  await submitButton.click();
  const form = page.getByTestId("input");
  await expect(page.getByText("Number out of range.")).toBeVisible();
});
