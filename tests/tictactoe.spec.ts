import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/TicTacToe/);
});

test("has heading for tic tac toe", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Expect a title "to contain" a substring.
  await expect(
    page.getByRole("heading", { name: "Tic Tac Toe" })
  ).toBeVisible();
});
