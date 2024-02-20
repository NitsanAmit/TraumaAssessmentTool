// @ts-ignore
describe('SAST', () => {
  it('Should be under threshold', () => {
    cy.visit('http://localhost:3006?mode=debug');
    cy.wait(1000);
    cy.contains('התחלה').click();
    for (let i = 0; i < 11; i++) {
      cy.contains('דלג').click();
    }
    cy.contains('SAST');
    for (let i = 0; i < 2; i++) {
      cy.get('input[value="1"]').click();
      cy.contains('לשאלה הבאה').click();
    }
    for (let i = 0; i < 7; i++) {
      cy.get('input[value="3"]').click();
      cy.contains('לשאלה הבאה').click();
    }
    cy.get('input[value="1"]').click();
    cy.contains('לשאלון הבא').click();
    for (let i = 0; i < 7; i++) {
      cy.contains('דלג').click();
    }
    cy.contains('Questionnaires Debug Data').click();
    cy.contains('SAST: 24 did not pass');
  });

  it('Should be over threshold', () => {
    cy.visit('http://localhost:3006?mode=debug');
    cy.wait(1000);
    cy.contains('התחלה').click();
    for (let i = 0; i < 11; i++) {
      cy.contains('דלג').click();
    }
    cy.contains('SAST');
    for (let i = 0; i < 2; i++) {
      cy.get('input[value="1"]').click();
      cy.contains('לשאלה הבאה').click();
    }
    for (let i = 0; i < 7; i++) {
      cy.get('input[value="3"]').click();
      cy.contains('לשאלה הבאה').click();
    }
    cy.get('input[value="2"]').click();
    cy.contains('לשאלון הבא').click();
    for (let i = 0; i < 7; i++) {
      cy.contains('דלג').click();
    }
    cy.contains('Questionnaires Debug Data').click();
    cy.contains('SAST: 25 passed');
  });

  it('Should reverse 4,5,9 question scores', () => {
    cy.visit('http://localhost:3006?mode=debug');
    cy.wait(1000);
    cy.contains('התחלה').click();
    for (let i = 0; i < 11; i++) {
      cy.contains('דלג').click();
    }
    cy.contains('SAST');
    cy.get(':nth-child(1) > label').should('have.text', 'לעולם או לעיתים רחוקות');
    for (let i = 0; i < 3; i++) {
      cy.get('input[value="1"]').click();
      cy.contains('לשאלה הבאה').click();
    }
    cy.contains('* שימ/י לב שסדר התשובות בשאלה זו הפוך');
    cy.get(':nth-child(1) > label').should('have.text', 'תמיד');
    cy.get('input[value="1"]').click();
    cy.contains('לשאלה הבאה').click();
    cy.contains('* שימ/י לב שסדר התשובות בשאלה זו הפוך');
    cy.get(':nth-child(1) > label').should('have.text', 'תמיד');
    cy.get('input[value="1"]').click();
    cy.contains('לשאלה הבאה').click();
    // should not contain
    cy.contains('* שימ/י לב שסדר התשובות בשאלה זו הפוך').should('not.exist');
    cy.get(':nth-child(1) > label').should('have.text', 'לעולם או לעיתים רחוקות');
    for (let i = 0; i < 3; i++) {
      cy.get('input[value="1"]').click();
      cy.contains('לשאלה הבאה').click();
    }
    cy.contains('* שימ/י לב שסדר התשובות בשאלה זו הפוך');
    cy.get(':nth-child(1) > label').should('have.text', 'תמיד');
    cy.get('input[value="1"]').click();
    cy.contains('לשאלה הבאה').click();
    cy.get('input[value="1"]').click();
    cy.contains('לשאלון הבא').click();
    for (let i = 0; i < 7; i++) {
      cy.contains('דלג').click();
    }
    cy.contains('Questionnaires Debug Data').click();
    cy.contains('SAST: 10 did not pass');
  });

})
