import { test, expect } from "@playwright/test";
import { FormPageObject } from "../page-objects/FormPageObject";

let testValues = [
  "Test Input",
  "+420788666111",
  "something@email.com",
  "Some Random Company s.r.o",
  "Some random opportunity for your company",
];

test("Fill form without click on personal data agreement", async ({ page }) => {
  let alertMessage =
    "Je třeba zaškrtnout políčko Souhlasím se zpracováním osobních údajů";

  let formPageObject = new FormPageObject(page);
  await formPageObject.openContactUs();
  await formPageObject.fillContactForm(testValues);
  await formPageObject.sendForm();
  await formPageObject.checkAlertWhenCheckBoxPersonalDataNotChecked(
    alertMessage
  );
});

test("Fill form click on personal data agreement", async ({ page }) => {
  let formPageObject = new FormPageObject(page);
  await formPageObject.openContactUs();
  await formPageObject.fillContactForm(testValues);
  await formPageObject.checkCheckBoxPersonalDataAgreement();
  await formPageObject.sendForm();
});
