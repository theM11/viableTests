import { expect } from "playwright/test";

export class FormPageObject {
  page;
  contactUsDialogLocator;
  contactUsButton;
  contactUsNameForm;
  contactUsPhoneForm;
  contactUsEmailForm;
  contactUsFirmNameForm;
  contactUsMessageForm;
  personalData;
  sendButton;
  gdprCheckBox;
  thanksForFillingDialog;

  constructor(page) {
    this.page = page;
    this.contactUsDialogLocator = this.page.locator(
      "xpath=//div[@class='modal-content bg-dark pt-5 px-5']"
    );
    this.contactUsButton = page.locator(
      "xpath=//div[@class='d-none d-lg-flex text-white navbar-nav nav-pills']//button"
    );
    this.contactUsNameForm = this.contactUsDialogLocator.locator(
      "//input[@name='name']"
    );
    this.contactUsPhoneForm = this.contactUsDialogLocator.locator(
      "//input[@name='phone']"
    );
    this.contactUsEmailForm = this.contactUsDialogLocator.locator(
      "//input[@name='email']"
    );
    this.contactUsFirmNameForm = this.contactUsDialogLocator.locator(
      "//input[@name='firmName']"
    );
    this.contactUsMessageForm = this.contactUsDialogLocator.locator(
      "//textarea[@name='message']"
    );
    this.personalData = this.contactUsDialogLocator.locator(
      "//p[@class='invalid-feedback m-0 fs-7']"
    );
    this.gdprCheckBox = this.contactUsDialogLocator.locator(
      "//input[@id='gdpr']"
    );
    this.sendButton = this.contactUsDialogLocator
      .getByRole("button")
      .filter({ hasText: "Odeslat" });
    this.thanksForFillingDialog = this.contactUsDialogLocator.locator(
      "//p[@class='m-0 text-center text-uppercase fs-2 fw-bold']"
    );
  }

  async openPage() {
    await this.page.goto("/");
  }

  async openContactUs() {
    await this.openPage();
    await this.contactUsButton.click();
    await this.page.getByRole("dialog").waitFor();
  }

  async fillContactForm(testValues) {
    expect(await this.page.getByRole("dialog")).toBeVisible();
    await this.contactUsNameForm.fill(testValues[0]);
    await this.contactUsPhoneForm.fill(testValues[1]);
    await this.contactUsEmailForm.fill(testValues[2]);
    await this.contactUsFirmNameForm.fill(testValues[3]);
    await this.contactUsMessageForm.fill(testValues[4]);
  }

  async checkCheckBoxPersonalDataAgreement() {
    await this.gdprCheckBox.check();
    await this.page.waitForTimeout(5000);
  }

  async sendForm() {
    await this.sendButton.click();
  }

  async thanksForFillingForm() {
    //await this.page.
  }

  async checkAlertWhenCheckBoxPersonalDataNotChecked(expectedErrorMessage) {
    expect(this.personalData).toBeVisible();
    expect(await this.personalData.innerText()).toEqual(expectedErrorMessage);
  }
}
