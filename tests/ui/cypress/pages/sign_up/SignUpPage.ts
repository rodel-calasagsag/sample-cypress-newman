import User from '../../models/User';

export function fillSignUpFormAndSubmit({
  firstName,
  lastName,
  username,
  password
}: User): void {
  typeFirstName(firstName);
  typeLastName(lastName);
  typeUsername(username);
  typePassword(password);
  typeConfirmPassword(password);
  submit();
}

function typeFirstName(firstName: string) {
  cy.get('#firstName').clear().type(firstName).should('have.value', firstName);
}

function typeLastName(lastName: string) {
  cy.get('#lastName').clear().type(lastName).should('have.value', lastName);
}

function typeUsername(username: string) {
  cy.get('#username').clear().type(username).should('have.value', username);
}

function typePassword(password: string) {
  cy.get('#password').clear().type(password).should('have.value', password);
}

function typeConfirmPassword(password: string) {
  cy.get('#confirmPassword')
    .clear()
    .type(password)
    .should('have.value', password);
}

function submit() {
  cy.dataTest('signup-submit').should('be.enabled').click();
}
