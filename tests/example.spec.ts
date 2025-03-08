import { test, expect } from "@playwright/test";
import { connectToDB } from "../helpers/dbConnector";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  console.log(process.env.URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("conn to db", async ({ page }) => {
  connectToDB();
});
