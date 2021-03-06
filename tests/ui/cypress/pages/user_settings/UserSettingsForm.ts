import User from '../../models/User';

export const USER_SETTINGS_PAGE_PATH = '/user/settings';

export function userSettingsPageFirstNameInput(): Cypress.Chainable<
  JQuery<Element>
> {
  return cy.dataTest('user-settings-firstName-input');
}

export function userSettingsPageLastNameInput(): Cypress.Chainable<
  JQuery<Element>
> {
  return cy.dataTest('user-settings-lastName-input');
}

export function fillUserSettingsFormAndSave({
  firstName,
  lastName,
  email,
  phoneNumber
}: User): void {
  userSettingsPageFirstNameInput().clear().type(firstName);

  userSettingsPageLastNameInput().clear().type(lastName);

  cy.dataTest('user-settings-email-input')
    .clear()
    .type(email)
    .should('have.value', email)
    .dataTest('user-settings-phoneNumber-input')
    .clear()
    .type(phoneNumber)
    .should('have.value', phoneNumber)
    .dataTest('user-settings-submit')
    .click();

  cy.intercept('/checkAuth', (req) => {
    req.reply((res) => {
      const actual = res.body.user;
      const actualFirstname = actual.firstName;
      const actualLastName = actual.lastName;
      const actualEmail = actual.email;
      const actualPhoneNumber = actual.phoneNumber;

      expect(actualFirstname).to.eq(firstName);
      expect(actualLastName).to.eq(lastName);
      expect(actualEmail).to.eq(email);
      expect(actualPhoneNumber).to.eq(phoneNumber);
    });
  });
}
