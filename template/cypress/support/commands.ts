// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

const { createJSDocTypeExpression } = require('typescript');

Cypress.Commands.add('getInternalUrls', () => {
  const listOfResults = [];
  cy.get('a').each((resultItem) => {
    let singleResult = '';
    //Retrive Title
    cy.wrap(resultItem)
      .invoke('attr', 'href')
      .then((href) => {
        if (
          typeof href !== 'undefined' &&
          href.indexOf('mailto') == -1 &&
          href.indexOf('tel') == -1 &&
          Cypress._.indexOf(listOfResults, href) == -1 &&
          (href.startsWith('/') || href.startsWith(Cypress.env('startUrl')))
        ) {
          singleResult = href;
        } else {
          cy.log('Filtered URL: ' + href);
        }
      });
    cy.then(() => {
      if (singleResult.length) {
        listOfResults.push(singleResult);
      }
    });
  });

  cy.wrap(listOfResults);
});
