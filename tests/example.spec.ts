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

test("Viable One test", async ({ page }) => {
  //connectToDB();
  await page.goto("https://v1-web-git-test-viableone.vercel.app/");

  let contactUsButton = page.locator(
    "xpath=//div[@class='d-none d-lg-flex text-white navbar-nav nav-pills']//button"
  );
  await contactUsButton.click();
  await page.getByRole("dialog").waitFor();
  let contactUsDialog = page.locator(
    "xpath=//div[@class='modal-content bg-dark pt-5 px-5']"
  );
  await contactUsDialog.locator("//input[@name='name']").fill("Test input");
  await contactUsDialog
    .locator("//input[@name='email']")
    .fill("something@email.com");
  await contactUsDialog.locator("//input[@name='phone']").fill("+420788666111");
  await contactUsDialog
    .locator("//input[@name='firmName']")
    .fill("Some Random Company s.r.o");
  await contactUsDialog
    .locator("//textarea[@name='message']")
    .fill("Some random opportunity for your company");
  await contactUsDialog
    .getByRole("button")
    .filter({ hasText: "Odeslat" })
    .click();

  let personalData = await contactUsDialog.locator(
    "//p[@class='invalid-feedback m-0 fs-7']"
  );
  expect(personalData).toBeVisible();

  await page.waitForTimeout(5000);
});
