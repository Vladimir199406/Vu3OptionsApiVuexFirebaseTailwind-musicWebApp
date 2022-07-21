describe('Audio Player', () => {
  it('playes audio', () => {
    cy.visit('/');
    cy.get('.e2e-test-class:first').click();
    cy.get('#play-button').click();
    cy.wait(5000);
    cy.get('#player-play-button').click();
  });
});
