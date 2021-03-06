import BankAccount from '../../models/BankAccount';
import { fillCreateBankAccountFormAndSubmit } from './CreateBankAccountForm';

export function bankAccountsListItem(
  bankAccount: BankAccount
): Cypress.Chainable<JQuery<Element>> {
  return cy.contains(bankAccount.bankName).parents('li');
}

export function deleteBankAccount(bankAccount: BankAccount): void {
  bankAccountsListItem(bankAccount)
    .should('be.visible')
    .within(() => {
      deleteButton().click();
    });
}

export function createBankAccount(bankAccount: BankAccount): void {
  const $createButton = 'bankaccount-new';

  cy.dataTest($createButton).click();
  fillCreateBankAccountFormAndSubmit(bankAccount);
}

export function deleteButton(): Cypress.Chainable<JQuery<Element>> {
  const $deleteButton = 'bankaccount-delete';

  return cy.dataTest($deleteButton);
}
