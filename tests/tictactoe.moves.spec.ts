import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.locator(".h-72 > div > div").first().click();
  await page
    .locator("div")
    .filter({ hasText: /^X__$/ })
    .locator("div")
    .nth(1)
    .click();
  await page.locator("div:nth-child(2) > div:nth-child(2)").first().click();
  await page
    .locator("div")
    .filter({ hasText: /^XO_$/ })
    .locator("div")
    .nth(2)
    .click();
  await page.getByText("_").nth(4).click();
  await page.getByText("X has won!").click();

  await expect(page.getByTestId("winner")).toHaveText("X has won!");
});
