/**
 * values range: 0-3
 * questions count: 9
 */

describe('PHQ-9', () => {
  it('Should be under threshold', () => {
    cy.visit('http://localhost:3006?mode=debug');
    cy.wait(1000);
    cy.contains('התחלה').click();
    for (let i = 0; i < 15; i++) {
      cy.contains('דלג').click();
    }
    cy.contains('PHQ-9');
    for (let i = 0; i < 8; i++) {
      cy.get('input[value="1"]').click();
      cy.contains('לשאלה הבאה').click();
    }
    cy.get('input[value="0"]').click();
    cy.contains('לשאלון הבא').click();
    for (let i = 0; i < 3; i++) {
      cy.contains('דלג').click();
    }
    cy.contains('Questionnaires Debug Data').click();
    cy.contains('PHQ-9: 8 did not pass');
  });

  it('Should be over threshold', () => {
    cy.visit('http://localhost:3006?mode=debug');
    cy.wait(1000);
    cy.contains('התחלה').click();
    for (let i = 0; i < 15; i++) {
      cy.contains('דלג').click();
    }
    cy.contains('PHQ-9');
    for (let i = 0; i < 3; i++) {
      cy.get('input[value="0"]').click();
      cy.contains('לשאלה הבאה').click();
    }
    for (let i = 0; i < 5; i++) {
      cy.get('input[value="3"]').click();
      cy.contains('לשאלה הבאה').click();
    }
    cy.get('input[value="0"]').click();
    cy.contains('לשאלון הבא').click();
    for (let i = 0; i < 3; i++) {
      cy.contains('דלג').click();
    }
    cy.contains('Questionnaires Debug Data').click();
    cy.contains('PHQ-9: 15 passed');
  });

  describe('PHQ-9 - suicide question', () => {

    it('1 value should override threshold', () => {
      cy.visit('http://localhost:3006?mode=debug');
      cy.wait(1000);
      cy.contains('התחלה').click();
      for (let i = 0; i < 15; i++) {
        cy.contains('דלג').click();
      }
      cy.contains('PHQ-9');
      for (let i = 0; i < 8; i++) {
        cy.get('input[value="0"]').click();
        cy.contains('לשאלה הבאה').click();
      }
      cy.get('input[value="1"]').click();
      cy.contains('לשאלון הבא').click();
      for (let i = 0; i < 3; i++) {
        cy.contains('דלג').click();
      }
      cy.contains('Questionnaires Debug Data').click();
      cy.contains('PHQ-9: 1 passed');
    });

    it('2 value should override threshold', () => {
      cy.visit('http://localhost:3006?mode=debug');
      cy.wait(1000);
      cy.contains('התחלה').click();
      for (let i = 0; i < 15; i++) {
        cy.contains('דלג').click();
      }
      cy.contains('PHQ-9');
      for (let i = 0; i < 8; i++) {
        cy.get('input[value="0"]').click();
        cy.contains('לשאלה הבאה').click();
      }
      cy.get('input[value="2"]').click();
      cy.contains('לשאלון הבא').click();
      for (let i = 0; i < 3; i++) {
        cy.contains('דלג').click();
      }
      cy.contains('Questionnaires Debug Data').click();
      cy.contains('PHQ-9: 2 passed');
    });

    it('3 value should override threshold', () => {
      cy.visit('http://localhost:3006?mode=debug');
      cy.wait(1000);
      cy.contains('התחלה').click();
      for (let i = 0; i < 15; i++) {
        cy.contains('דלג').click();
      }
      cy.contains('PHQ-9');
      for (let i = 0; i < 8; i++) {
        cy.get('input[value="0"]').click();
        cy.contains('לשאלה הבאה').click();
      }
      cy.get('input[value="3"]').click();
      cy.contains('לשאלון הבא').click();
      for (let i = 0; i < 3; i++) {
        cy.contains('דלג').click();
      }
      cy.contains('Questionnaires Debug Data').click();
      cy.contains('PHQ-9: 3 passed');
    });
  });
})
