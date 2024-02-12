function skipToSummary() {
  for (let i = 0; i < 19; i++) {
    cy.contains('דלג').click();
  }
}
describe('Personal Details Step', () => {
  it('Should save personal details correctly', () => {
    cy.visit('http://localhost:3006?mode=debug');
    cy.wait(1000);
    cy.contains('התחלה').click();
    cy.contains('שאלון היכרות (רשות)');
    cy.contains('פרטים אישיים');
    cy.contains('לשלב הקודם');
    cy.contains('המשך');
    cy.contains('דלג').click();
    cy.contains('רגע לפני שנתחיל');
    cy.contains('לשלב הקודם').click();
    cy.contains('שאלון היכרות (רשות)');
    cy.get('input[placeholder="שם פרטי"]').type('ניצן');
    cy.get('input[placeholder="שם משפחה"]').type('עמית');
    cy.contains('מגדר').click();
    cy.contains('נקבה').click();
    cy.get('input[placeholder="גיל"]').type('28');
    cy.contains('מצב משפחתי').click();
    cy.contains('גרוש/ה').click();
    cy.get('input[placeholder="מספר ילדים"]').type('10');
    cy.contains('מה מצבך בריאותך הגופנית היום?').click();
    cy.contains('בסך הכל בסדר').click();
    cy.contains('האם יש עליך לחצים היום (כמו מעבר דירה, אבטלה, קרובי משפחה חטופים)?').click();
    cy.contains('לחצים בלתי נסבלים').click();
    cy.contains('האם אנשים אחרים (חברים, מכרים, קרובי משפחה) תומכים בך היום?').click();
    cy.contains('תמיכה בסדר').click();
    cy.get('input[name="mental-treatment-now"][value="כן"]').click();
    cy.get('input[name="mental-treatment-past"][value="כן"]').click();
    cy.get('input[name="drugs-usage"][value="לא"]').click();
    skipToSummary();
    cy.contains('Personal Details Debug Data').click();
    cy.get('#personal-details-debug').should('have.text',
      "שם פרטי: ניצן" +
      "שם משפחה: עמית" +
      "מגדר: נקבה" +
      "גיל: 28" +
      "מצב משפחתי: גרוש/ה" +
      "מספר ילדים: 10" +
      "מצב בריאות כללי: בסך הכל בסדר" +
      "מצב כללי: לחצים בלתי נסבלים" +
      "מעגלי תמיכה: תמיכה בסדר" +
      "טיפול נפשי בעבר: כן" +
      "טיפול נפשי כיום: כן" +
      "טיפול נפשי תרופתי: לא"
    );
  });
})
